from __future__ import annotations

import cv2
import numpy as np


def extract_waveform_v2(
    image_rgb: np.ndarray,
    roi: tuple[int, int, int, int],
    mode: str = "paper",
) -> dict:
    """
    Experimental ECG candidate-trace extraction V2.
    Pixel extraction only. No clinical measurements or diagnosis.
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

    image_height, image_width = image_rgb.shape[:2]

    if len(roi) != 4:
        raise ValueError("ROI must contain x, y, width and height.")

    x, y, width, height = roi

    if width < 100 or height < 40:
        raise ValueError("The selected ECG region is too small.")

    if x < 0 or y < 0 or x + width > image_width or y + height > image_height:
        raise ValueError("The selected region is outside the image.")

    crop = image_rgb[y:y + height, x:x + width]
    hsv = cv2.cvtColor(crop, cv2.COLOR_RGB2HSV)
    gray = cv2.cvtColor(crop, cv2.COLOR_RGB2GRAY)

    if mode == "paper":
        mask = (gray < 125) & (hsv[:, :, 1] < 115)
    else:
        mask = (hsv[:, :, 2] > 145) & (hsv[:, :, 1] > 65)

    binary = mask.astype(np.uint8)

    # Remove isolated single-pixel noise.
    count, labels, stats, _ = cv2.connectedComponentsWithStats(
        binary, connectivity=8
    )

    cleaned = np.zeros_like(binary)

    for component in range(1, count):
        area = stats[component, cv2.CC_STAT_AREA]
        component_width = stats[component, cv2.CC_STAT_WIDTH]
        component_height = stats[component, cv2.CC_STAT_HEIGHT]

        if area < 2:
            continue

        horizontal_overlay = (
            component_width >= max(80, int(width * 0.12))
            and component_width / max(component_height, 1) >= 10
        )

        vertical_overlay = (
            component_height >= max(50, int(height * 0.25))
            and component_height / max(component_width, 1) >= 8
        )

        if horizontal_overlay or vertical_overlay:
            continue

        cleaned[labels == component] = 1

    # Collect candidate rows per column.
    candidates = [
        np.flatnonzero(cleaned[:, column])
        for column in range(width)
    ]

    column_centers = [
        float(np.median(rows))
        for rows in candidates
        if rows.size
    ]

    coverage = len(column_centers) / width

    if not column_centers:
        return {
            "status": "low_confidence",
            "reason": "No candidate trace was detected.",
            "coverage": 0.0,
            "points": [],
            "measurements": None,
            "clinical_interpretation": None,
        }

    # Estimate the dominant waveform region, then select the nearest
    # candidate in each column instead of taking the median of all pixels.
    reference_y = float(np.median(column_centers))

    values = np.full(width, np.nan, dtype=np.float32)

    for column, rows in enumerate(candidates):
        if rows.size:
            nearest = np.argmin(np.abs(rows.astype(np.float32) - reference_y))
            values[column] = float(rows[nearest])

    valid = np.flatnonzero(np.isfinite(values))

    if valid.size < 2:
        raise ValueError("A candidate trace could not be detected.")

    # Fill only short gaps; long gaps remain unavailable.
    missing = np.flatnonzero(~np.isfinite(values))

    for index in missing:
        left = valid[valid < index]
        right = valid[valid > index]

        if left.size and right.size:
            a, b = left[-1], right[0]
            if b - a <= 4:
                values[index] = np.interp(
                    index, [a, b], [values[a], values[b]]
                )

    valid_values = values[np.isfinite(values)]

    if valid_values.size < 2:
        raise ValueError("Insufficient valid trace points.")

    vertical_range = float(np.ptp(valid_values))

    if coverage < 0.35 or vertical_range < 8:
        return {
            "status": "low_confidence",
            "reason": "Trace coverage or vertical variation is insufficient.",
            "coverage": round(coverage, 3),
            "vertical_range_px": round(vertical_range, 2),
            "points": [],
            "measurements": None,
            "clinical_interpretation": None,
        }

    output_points = []

    step = max(1, width // 500)

    for index in range(0, width, step):
        value = values[index]

        output_points.append(
            None if not np.isfinite(value) else {
                "x_px": int(x + index),
                "y_px": round(float(y + value), 2),
            }
        )

    return {
        "status": "candidate_trace_extracted",
        "algorithm": "experimental_v2",
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
            "Overlay removal may remove genuine waveform segments.",
            "Candidate selection is not validated on clinical ECG datasets.",
            "Time and voltage calibration are not verified.",
            "No diagnosis or clinical decision is produced.",
        ],
    }
