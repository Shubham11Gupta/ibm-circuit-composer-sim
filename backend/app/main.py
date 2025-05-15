# backend/app/main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from .circuit_handler import process_circuit

app = FastAPI()

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/run")
async def run_circuit(request: Request):
    data = await request.json()
    circuit_data = data.get("circuit")
    result = process_circuit(circuit_data)
    return result
@app.get("/")
def root():
    return {"message": "Hello from backend!"}