from datetime import datetime, timezone
from pathlib import Path
import os
import uuid

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from .database import init_db, get_connection
from .schemas import VitalsIn, SimulationIn, SimulationOut
from .simulation import run_cardiovascular_demo
from .ecg_analysis import inspect_ecg_file
from .ecg_signal_processing import preprocess_ecg_image

APP_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = APP_DIR / "frontend"
UPLOAD_DIR = Path(os.getenv("PULSEAR_UPLOAD_DIR", APP_DIR / "uploads"))
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

PUBLIC_DEMO_MODE = os.getenv("PULSEAR_PUBLIC_DEMO", "false").lower() == "true"

app = FastAPI(
    title="PulseAR Prototype API",
    version="0.1.0",
    description="Educational cardiovascular visualization prototype. Not for clinical use.",
    docs_url=None if PUBLIC_DEMO_MODE else "/docs",
    redoc_url=None if PUBLIC_DEMO_MODE else "/redoc",
    openapi_url=None if PUBLIC_DEMO_MODE else "/openapi.json",
)

@app.on_event("startup")
def startup():
    init_db()

@app.get("/api/health")
def health():
    return {"status": "ok", "app": "PulseAR", "version": "0.1.0"}

@app.post("/api/patients/demo/vitals")
def save_vitals(payload: VitalsIn):
    if PUBLIC_DEMO_MODE:
        raise HTTPException(status_code=403, detail="Public demo mode: measurements are not saved.")
    if payload.diastolic_bp >= payload.systolic_bp:
        raise HTTPException(status_code=422, detail="Systolic BP must exceed diastolic BP.")
    now = datetime.now(timezone.utc).isoformat()
    with get_connection() as conn:
        cur = conn.execute(
            """INSERT INTO vitals
            (patient_id, systolic_bp, diastolic_bp, heart_rate, spo2, respiratory_rate, recorded_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)""",
            ("DEMO-001", payload.systolic_bp, payload.diastolic_bp,
             payload.heart_rate, payload.spo2, payload.respiratory_rate, now)
        )
        conn.commit()
        row_id = cur.lastrowid
    return {"id": row_id, "patient_id": "DEMO-001", **payload.model_dump(), "recorded_at": now}

@app.get("/api/patients/demo/latest")
def latest_vitals():
    if PUBLIC_DEMO_MODE:
        return {"message": "Public demo mode: no saved measurements."}

    with get_connection() as conn:
        row = conn.execute(
            "SELECT * FROM vitals WHERE patient_id=? ORDER BY id DESC LIMIT 1",
            ("DEMO-001",)
        ).fetchone()
    return dict(row) if row else {"message": "No saved measurements yet"}

@app.post(
    "/api/simulation/cardiovascular",
    response_model=SimulationOut
)
def cardiovascular_simulation(
    payload: SimulationIn
) -> SimulationOut:
    return run_cardiovascular_demo(payload)

@app.post("/api/patients/demo/ecg-image")
async def upload_ecg_image(file: UploadFile = File(...)):
    if PUBLIC_DEMO_MODE:
        raise HTTPException(status_code=403, detail="Public demo mode: ECG uploads are disabled.")
    content = await file.read()

    try:
        inspection = inspect_ecg_file(file.filename or "", content)
        preprocessing = preprocess_ecg_image(file.filename or "", content)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

    suffix = Path(file.filename or "").suffix.lower()
    safe_name = f"{uuid.uuid4().hex}{suffix}"
    destination = UPLOAD_DIR / safe_name
    destination.write_bytes(content)

    now = datetime.now(timezone.utc).isoformat()
    with get_connection() as conn:
        cur = conn.execute(
            "INSERT INTO uploads (patient_id, filename, stored_path, uploaded_at) VALUES (?, ?, ?, ?)",
            ("DEMO-001", file.filename or safe_name, str(destination), now)
        )
        conn.commit()

    return {
        "upload_id": cur.lastrowid,
        "filename": file.filename,
        "status": "file_inspected",
        "file_inspection": inspection,
        "preprocessing": preprocessing,
        "message": "File inspected and preprocessed. ECG waveform interpretation is not yet available."
    }

@app.get("/")
def index():
    return FileResponse(FRONTEND_DIR / "index.html")

app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")
