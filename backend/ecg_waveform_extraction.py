from __future__ import annotations

import cv2
import numpy as np


def extract_waveform(
    image_rgb: np.ndarray,
    roi: tuple[int, int, int, int],
    mode: str = "paper",
) -> dict:
    """
    Extract a candidate ECG trace from one manually selected lead region.

    This is pixel-path extraction only. It does not measure ECG intervals,
    calculate heart rate, or provide a clinical interpretation.
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
    x, y, width, height = roi

    if width < 100 or height < 40:
        raise ValueError("The selected ECG region is too small.")

    if x < 0 or y < 0 or x + width > image_width or y + height > image_height:
        raise ValueError("The selected region is outside the image.")

    crop = image_rgb[y:y + height, x:x + width]
    hsv = cv2.cvtColor(crop, cv2.COLOR_RGB2HSV)
    gray = cv2.cvtColor(crop, cv2.COLOR_RGB2GRAY)

    if mode == "paper":
        # Prefer dark ink and reduce interference from colored paper grids.
        mask = (
            (gray < 125)
            & (hsv[:, :, 1] < 115)
        )
    else:
        # Prefer bright, saturated traces on dark monitor backgrounds.
        mask = (
            (hsv[:, :, 2] > 145)
            & (hsv[:, :, 1] > 65)
        )

    binary = (mask.astype(np.uint8) * 255)

    # On paper ECGs, the dark-ink/color threshold already rejects
    # most pale grid lines. Do not erase horizontal or vertical strokes:
    # genuine ECG segments can have those orientations.
    if mode == "paper":
        trace_mask = binary
    else:
        # Screen mode remains provisional; remove long straight overlays.
        horizontal_length = max(25, width // 18)
        vertical_length = max(20, height // 3)

        horizontal_kernel = cv2.getStructuringElement(
            cv2.MORPH_RECT, (horizontal_length, 1)
        )
        vertical_kernel = cv2.getStructuringElement(
            cv2.MORPH_RECT, (1, vertical_length)
        )

        horizontal_lines = cv2.morphologyEx(
            binary, cv2.MORPH_OPEN, horizontal_kernel
        )
        vertical_lines = cv2.morphologyEx(
            binary, cv2.MORPH_OPEN, vertical_kernel
        )

        grid_mask = cv2.bitwise_or(horizontal_lines, vertical_lines)
        trace_mask = cv2.bitwise_and(binary, cv2.bitwise_not(grid_mask))

    # Find a representative vertical position for each image column.
    points = []
    valid_columns = 0

    for column in range(width):
        rows = np.flatnonzero(trace_mask[:, column])

        if rows.size:
            valid_columns += 1
            points.append(float(np.median(rows)))
        else:
            points.append(None)

    coverage = valid_columns / width

    if coverage < 0.35:
        return {
            "status": "low_confidence",
            "reason": "Too few columns contain a detectable trace.",
            "coverage": round(coverage, 3),
            "points": [],
            "measurements": None,
            "clinical_interpretation": None,
        }

    # Fill only short gaps; long gaps remain unavailable.
    values = np.array(
        [np.nan if point is None else point for point in points],
        dtype=np.float32,
    )
    valid = np.flatnonzero(np.isfinite(values))

    if valid.size < 2:
        raise ValueError("A continuous candidate trace could not be detected.")

    missing = np.flatnonzero(~np.isfinite(values))
    for index in missing:
        left = valid[valid < index]
        right = valid[valid > index]

        if left.size and right.size:
            a, b = left[-1], right[0]
            if b - a <= 4:
                values[index] = np.interp(index, [a, b], [values[a], values[b]])

    # Smooth small pixel-level fluctuations without inventing signal data.
    smoothed = cv2.medianBlur(
        np.nan_to_num(values, nan=-1).reshape(1, -1).astype(np.float32),
        1
    ).flatten()

    output_points = []
    for index in range(0, width, max(1, width // 500)):
        value = smoothed[index]
        output_points.append(
            None if value < 0 else {
                "x_px": int(x + index),
                "y_px": round(float(y + value), 2),
            }
        )

    return {
        "status": "candidate_trace_extracted",
        "mode": mode,
        "roi": {
            "x": x,
            "y": y,
            "width": width,
            "height": height,
        },
        "coverage": round(coverage, 3),
        "points": output_points,
        "measurements": None,
        "calibration_status": "not_verified",
        "clinical_interpretation": None,
        "limitations": [
            "The extracted path is a candidate pixel trace, not a verified ECG signal.",
            "Grid removal may also remove parts of the waveform.",
            "Time and voltage calibration are required before measurements.",
            "No diagnosis or clinical decision is produced.",
        ],
    }
