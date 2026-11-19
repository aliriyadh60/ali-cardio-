# PulseAR Desktop Prototype 0.1

Desktop-first educational cardiovascular visualization prototype.

**Safety:** Not a medical device. Not validated for diagnosis, triage, monitoring, or treatment. Use synthetic data only.

## Requirements
- Python 3.10+
- Internet connection for the Three.js CDN

## Run
```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn backend.main:app --reload
```
Open http://127.0.0.1:8000

## Features
- Demo patient dashboard
- Editable BP, HR, SpO2 and respiratory rate
- FastAPI + SQLite persistence
- Simplified formula-based demo outputs
- Procedural animated 3D heart placeholder using Three.js
- ECG file upload (storage only; no ECG interpretation)

## Structure
```text
backend/   FastAPI, database, schemas, simulation
frontend/  HTML, CSS, Three.js client
uploads/   Uploaded demo files
```

## API
- GET `/api/health`
- POST `/api/patients/demo/vitals`
- GET `/api/patients/demo/latest`
- POST `/api/patients/demo/ecg-image`
- POST `/api/simulation/cardiovascular`

## Limitations
- The 3D heart is a procedural placeholder, not patient-specific anatomy.
- The model is illustrative and not clinically validated.
- MAP is a formula-based estimate.
- Cardiac output remains unavailable unless stroke volume is explicitly supplied.
- BP, HR and SpO2 cannot establish coronary obstruction, ejection fraction, or tissue perfusion.
- ECG upload stores the file only; it does not interpret it.
- Do not upload identifiable patient information.
