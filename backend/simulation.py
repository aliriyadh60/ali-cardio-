from datetime import datetime, timezone
from .schemas import SimulationIn, SimulationOut

def run_cardiovascular_demo(data: SimulationIn) -> SimulationOut:
    """Simplified educational calculations only; not clinically validated."""
    pulse_pressure = data.systolic_bp - data.diastolic_bp
    map_estimate = round((data.systolic_bp + 2 * data.diastolic_bp) / 3, 1)

    # CO requires stroke volume; never infer it from BP/HR alone.
    if data.stroke_volume_ml is not None:
        cardiac_output = round(data.heart_rate * data.stroke_volume_ml / 1000, 2)
        co_status = "Illustrative calculation from explicitly supplied HR and stroke volume."
    else:
        cardiac_output = None
        co_status = "Unavailable: stroke volume was not supplied."

    if data.heart_rate >= 100:
        visual_state = "faster_beat_demo"
    elif data.heart_rate <= 60:
        visual_state = "slower_beat_demo"
    else:
        visual_state = "baseline_demo"

    return SimulationOut(
        model_name="PulseAR Simplified Cardiovascular Demo",
        model_version="0.1.0",
        heart_rate_bpm=data.heart_rate,
        pulse_pressure_mmHg=pulse_pressure,
        mean_arterial_pressure_estimate_mmHg=map_estimate,
        cardiac_output_l_min=cardiac_output,
        cardiac_output_status=co_status,
        visual_state=visual_state,
        limitations=[
            "Educational simulation only; not clinically validated.",
            "MAP is a formula-based estimate, not a direct measurement.",
            "No inference of ejection fraction, coronary obstruction, or tissue perfusion.",
            "The animation is illustrative and is not synchronized to a measured ECG waveform."
        ],
        generated_at=datetime.now(timezone.utc)
    )
