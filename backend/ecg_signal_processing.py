from io import BytesIO
from pathlib import Path

import cv2
import numpy as np
import pymupdf
from PIL import Image, ImageOps


MAX_FILE_SIZE = 12 * 1024 * 1024
ALLOWED_FORMATS = {".png", ".jpg", ".jpeg", ".pdf"}


def load_ecg_image(filename: str, content: bytes):
    suffix = Path(filename).suffix.lower()

    if suffix not in ALLOWED_FORMATS:
        raise ValueError("Unsupported ECG format.")

    if not content or len(content) > MAX_FILE_SIZE:
        raise ValueError("Invalid ECG file size.")

    if suffix == ".pdf":
        with pymupdf.open(stream=content, filetype="pdf") as doc:
            if doc.is_encrypted or doc.page_count == 0:
                raise ValueError("PDF cannot be processed.")

            pix = doc[0].get_pixmap(
                matrix=pymupdf.Matrix(2, 2),
                colorspace=pymupdf.csRGB,
                alpha=False
            )
            image = Image.frombytes(
                "RGB", (pix.width, pix.height), pix.samples
            )
    else:
        with Image.open(BytesIO(content)) as source:
            image = ImageOps.exif_transpose(source).convert("RGB")

    return np.array(image)


def preprocess_ecg_image(filename: str, content: bytes) -> dict:
    image_rgb = load_ecg_image(filename, content)

    height, width = image_rgb.shape[:2]

    if width < 300 or height < 150:
        raise ValueError("ECG image resolution is too small.")

    if width * height > 40_000_000:
        raise ValueError("ECG image dimensions exceed the processing limit.")

    gray = cv2.cvtColor(image_rgb, cv2.COLOR_RGB2GRAY)

    clahe = cv2.createCLAHE(
        clipLimit=2.0,
        tileGridSize=(8, 8)
    )
    enhanced = clahe.apply(gray)

    _, binary = cv2.threshold(
        enhanced,
        0,
        255,
        cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU
    )

    contrast = float(np.std(gray))
    mean_brightness = float(np.mean(gray))
    foreground_ratio = float(np.count_nonzero(binary) / binary.size)

    quality_flags = []

    if contrast < 20:
        quality_flags.append("Low image contrast.")

    if mean_brightness < 35 or (mean_brightness > 245 and contrast < 8):
        quality_flags.append("Image brightness may be unsuitable.")

    if foreground_ratio < 0.001 or foreground_ratio > 0.45:
        quality_flags.append("Unusual foreground pixel distribution.")

    return {
        "processing_stage": "image_preprocessed",
        "image_width_px": width,
        "image_height_px": height,
        "grayscale": True,
        "contrast_std": round(contrast, 2),
        "mean_brightness": round(mean_brightness, 2),
        "foreground_ratio": round(foreground_ratio, 4),
        "quality_flags": quality_flags,
        "calibration_status": "not_verified",
        "waveform_extraction": "not_implemented",
        "heart_rate_bpm": None,
        "limitations": [
            "Image preprocessing is not ECG interpretation.",
            "Paper speed and voltage calibration are not verified.",
            "No waveform measurements or vital signs are inferred."
        ]
    }
