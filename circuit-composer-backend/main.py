from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify ["http://localhost:5173"] for Vite, ["http://localhost:3000"] for CRA
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
    return {"ack": f"Code received. Length: {len(payload.code)} chars"}
