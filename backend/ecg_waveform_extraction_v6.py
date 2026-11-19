from __future__ import annotations

import cv2
import numpy as np


def extract_waveform_v6(
    image_rgb: np.ndarray,
    roi: tuple[int, int, int, int],
    mode: str = "paper",
) -> dict:
    """
    Experimental ECG waveform tracking V3.
    Dynamic programming with continuity constraints.
    Pixel extraction only; no clinical measurements or diagnosis.
    """

    if mode not in {"paper", "screen"}:
        raise ValueError("Mode must be 'paper' or 'screen'.")

    if (
        not isinstance(image_rgb, np.ndarray)
        or image_rgb.ndim != 3
        or image_rgb.shape[2] != 3
        or image_rgb.dtype != np.uint8
    ):
        raise ValueError("Expected an 8-bit RGB image.")

    if len(roi) != 4:
        raise ValueError("ROI must contain x, y, width and height.")

    x, y, width, height = roi
    image_height, image_width = image_rgb.shape[:2]

    if width < 100 or height < 40:
        raise ValueError("The selected ECG region is too small.")

    if (
        x < 0 or y < 0
        or x + width > image_width
        or y + height > image_height
    ):
        raise ValueError("The selected region is outside the image.")

    crop = image_rgb[y:y + height, x:x + width]
    hsv = cv2.cvtColor(crop, cv2.COLOR_RGB2HSV)
    gray = cv2.cvtColor(crop, cv2.COLOR_RGB2GRAY)

    if mode == "paper":
        mask = ((gray < 125) & (hsv[:, :, 1] < 115)).astype(np.uint8)
    else:
        mask = (
            (hsv[:, :, 2] > 145) & (hsv[:, :, 1] > 65)
        ).astype(np.uint8)

    # Experimental density-based overlay removal for ECG paper.
    cleaned = mask.copy()

    if mode == "paper":
        horizontal_rows = np.where(
            mask.sum(axis=1) >= width * 0.70
        )[0]

        vertical_columns = np.where(
            mask.sum(axis=0) >= height * 0.70
        )[0]

        cleaned[horizontal_rows, :] = 0
        cleaned[:, vertical_columns] = 0

    # Dynamic programming: follow a continuous path through image columns.
    max_step = min(40, max(12, height // 6))
    transition_penalty = 0.05
    ink_reward = 4.0
    background_cost = 1.5

    unary = np.where(
        cleaned > 0,
        -ink_reward,
        background_cost
    ).astype(np.float32)

    previous = unary[:, 0].copy()
    backtrack = np.zeros((width, height), dtype=np.int16)

    for column in range(1, width):
        current = np.empty(height, dtype=np.float32)
        parents = np.empty(height, dtype=np.int16)

        for row in range(height):
            low = max(0, row - max_step)
            high = min(height, row + max_step + 1)

            prior_rows = np.arange(low, high)
            transition = (
                previous[low:high]
                + transition_penalty * np.abs(prior_rows - row)
            )

            best_index = int(np.argmin(transition))
            parents[row] = low + best_index
            current[row] = unary[row, column] + transition[best_index]

        backtrack[column] = parents
        previous = current

    # Recover the lowest-cost path.
    path = np.empty(width, dtype=np.int32)
    path[-1] = int(np.argmin(previous))

    for column in range(width - 1, 0, -1):
        path[column - 1] = backtrack[column, path[column]]

    # Confidence is based on how often the path overlaps detected trace pixels.
    columns = np.arange(width)
    trace_hits = cleaned[path, columns] > 0
    coverage = float(np.mean(trace_hits))
    vertical_range = float(np.ptp(path))

    if coverage < 0.20 or vertical_range < 5:
        return {
            "status": "low_confidence",
            "reason": "Insufficient trace evidence for reliable path tracking.",
            "algorithm": "experimental_v6_density_cleaning_dynamic_programming",
            "coverage": round(coverage, 3),
            "vertical_range_px": round(vertical_range, 2),
            "points": [],
            "measurements": None,
            "calibration_status": "not_verified",
            "clinical_interpretation": None,
        }

    step = max(1, width // 500)
    output_points = [
        {
            "x_px": int(x + index),
            "y_px": round(float(y + path[index]), 2),
        }
        for index in range(0, width, step)
    ]

    return {
        "status": "candidate_trace_extracted",
        "algorithm": "experimental_v6_density_cleaning_dynamic_programming",
        "mode": mode,
        "roi": {
            "x": x,
            "y": y,
            "width": width,
            "height": height,
        },
        "coverage": round(coverage, 3),
        "vertical_range_px": round(vertical_range, 2),
        "points": output_points,
        "measurements": None,
        "calibration_status": "not_verified",
        "clinical_interpretation": None,
        "limitations": [
            "Experimental pixel-path extraction only.",
            "Dynamic programming may follow unrelated dark objects.",
            "Horizontal-line removal may remove genuine flat waveform segments.",
            "Not validated on clinical ECG datasets.",
            "Time and voltage calibration are not verified.",
            "No diagnosis or clinical decision is produced.",
        ],
    }
