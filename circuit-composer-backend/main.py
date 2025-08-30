from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import sys
import subprocess
import base64
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from Circuit Composer Backend!"}

class CodePayload(BaseModel):
    code: str

@app.post("/submit")
async def submit_code(payload: CodePayload):
    sim_path = os.path.join(os.path.dirname(__file__), "quantum_sim.py")
    # Read the template file
    with open(sim_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    # Find the start and end markers
    start_idx = None
    end_idx = None
    for i, line in enumerate(lines):
        if "#Code Append Start" in line:
            start_idx = i
        if "#Code Append End" in line:
            end_idx = i

    if start_idx is None or end_idx is None or start_idx >= end_idx:
        return {"error": "Code append markers not found in quantum_sim.py"}

    # Erase any code between the markers and insert the new code
    new_lines = (
        lines[:start_idx+1] +
        [payload.code + "\n"] +
        lines[end_idx:]
    )

    # Write the modified file
    with open(sim_path, "w", encoding="utf-8") as f:
        f.writelines(new_lines)

    # Run the script and capture output
    try:
        result = subprocess.run(
            [sys.executable, sim_path],
            capture_output=True,
            text=True
        )
        output = result.stdout + result.stderr

        # Read output_probabilities.png as base64 if it exists
        prob_b64 = None
        prob_path = os.path.join(os.path.dirname(__file__), "output_probabilities.png")
        if os.path.exists(prob_path):
            with open(prob_path, "rb") as img_file:
                prob_b64 = base64.b64encode(img_file.read()).decode("utf-8")
            os.remove(prob_path)

        # Read output_statevector.png as base64 if it exists
        statevec_b64 = None
        statevec_path = os.path.join(os.path.dirname(__file__), "output_statevector.png")
        if os.path.exists(statevec_path):
            with open(statevec_path, "rb") as img_file:
                statevec_b64 = base64.b64encode(img_file.read()).decode("utf-8")
            os.remove(statevec_path)

        # Read output_data.json for raw arrays
        statevector = None
        probabilities = None
        data_path = os.path.join(os.path.dirname(__file__), "output_data.json")
        if os.path.exists(data_path):
            with open(data_path, "r") as f:
                data_json = json.load(f)
                statevector = data_json.get("statevector")
                probabilities = data_json.get("probabilities")
            os.remove(data_path)

        return {
            "result": output,
            "probabilities_plot_base64": prob_b64,
            "statevector_plot_base64": statevec_b64,
            "statevector": statevector,
            "probabilities": probabilities
        }
    except Exception as e:
        return {"error": str(e)}
