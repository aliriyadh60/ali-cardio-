from io import BytesIO
from pathlib import Path

import pymupdf
from PIL import Image, ImageOps


ALLOWED_FORMATS = {".png", ".jpg", ".jpeg", ".pdf"}
MAX_FILE_SIZE = 12 * 1024 * 1024


def inspect_ecg_file(filename: str, content: bytes) -> dict:
    suffix = Path(filename).suffix.lower()

    if suffix not in ALLOWED_FORMATS:
        raise ValueError("Unsupported ECG file format.")

    if not content:
        raise ValueError("The uploaded file is empty.")

    if len(content) > MAX_FILE_SIZE:
        raise ValueError("The uploaded file exceeds 12 MB.")

    if suffix == ".pdf":
        try:
            with pymupdf.open(stream=content, filetype="pdf") as document:
                if document.is_encrypted:
                    raise ValueError("Encrypted PDF files are not supported.")

                if document.page_count == 0:
                    raise ValueError("The PDF contains no pages.")

                page = document[0]
                pixmap = page.get_pixmap(matrix=pymupdf.Matrix(2, 2), alpha=False)

                return {
                    "file_type": "pdf",
                    "page_count": document.page_count,
                    "image_width_px": pixmap.width,
                    "image_height_px": pixmap.height,
                    "status": "file_inspected",
                    "analysis_stage": "preprocessing_only",
                    "message": "PDF opened and first page rendered successfully."
                }
        except ValueError:
            raise
        except Exception as exc:
            raise ValueError("Could not read the PDF file.") from exc

    try:
        with Image.open(BytesIO(content)) as source:
            image = ImageOps.exif_transpose(source)
            image.verify()

        with Image.open(BytesIO(content)) as source:
            image = ImageOps.exif_transpose(source)
            width, height = image.size

        return {
            "file_type": "image",
            "page_count": 1,
            "image_width_px": width,
            "image_height_px": height,
            "status": "file_inspected",
            "analysis_stage": "preprocessing_only",
            "message": "ECG image opened successfully."
        }
    except Exception as exc:
        raise ValueError("Could not read the ECG image.") from exc
