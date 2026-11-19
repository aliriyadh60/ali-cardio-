import os
import sqlite3
from pathlib import Path

DB_PATH = os.getenv("PULSEAR_DB_PATH", "pulsear.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    parent = Path(DB_PATH).parent
    if str(parent) != ".":
        parent.mkdir(parents=True, exist_ok=True)
    with get_connection() as conn:
        conn.execute("""
        CREATE TABLE IF NOT EXISTS vitals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_id TEXT NOT NULL,
            systolic_bp INTEGER NOT NULL,
            diastolic_bp INTEGER NOT NULL,
            heart_rate INTEGER NOT NULL,
            spo2 REAL NOT NULL,
            respiratory_rate INTEGER NOT NULL,
            recorded_at TEXT NOT NULL
        )
        """)
        conn.execute("""
        CREATE TABLE IF NOT EXISTS uploads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_id TEXT NOT NULL,
            filename TEXT NOT NULL,
            stored_path TEXT NOT NULL,
            uploaded_at TEXT NOT NULL
        )
        """)
        conn.commit()
