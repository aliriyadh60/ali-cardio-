from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict

class VitalsIn(BaseModel):
    systolic_bp: int = Field(ge=50, le=260)
    diastolic_bp: int = Field(ge=20, le=160)
    heart_rate: int = Field(ge=20, le=250)
    spo2: float = Field(ge=50, le=100)
    respiratory_rate: int = Field(ge=4, le=70)

class SimulationIn(VitalsIn):
    stroke_volume_ml: float | None = Field(default=None, gt=0, le=250)

class SimulationOut(BaseModel):
    model_name: str
    model_version: str
    heart_rate_bpm: int
    pulse_pressure_mmHg: int
    mean_arterial_pressure_estimate_mmHg: float
    cardiac_output_l_min: float | None
    cardiac_output_status: str
    visual_state: str
    limitations: list[str]
    generated_at: datetime
