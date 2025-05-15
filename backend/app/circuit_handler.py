# backend/app/circuit_handler.py
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector
from qiskit.visualization import plot_state_qsphere
import matplotlib.pyplot as plt
import io
import base64

def process_circuit(circuit_data):
    qc = QuantumCircuit(2)

    for gate in circuit_data:
        if gate["gate"] == "h":
            qc.h(gate["qubit"])
        elif gate["gate"] == "x":
            qc.x(gate["qubit"])
        elif gate["gate"] == "cx":
            qc.cx(gate["control"], gate["target"])
    
    # Simulate
    state = Statevector.from_instruction(qc)
    probs = state.probabilities_dict()

    # Qsphere plot
    buf = io.BytesIO()
    plot_state_qsphere(state)
    plt.savefig(buf, format='png')
    plt.close()
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode()

    return {
        "probabilities": probs,
        "statevector": state.data.tolist(),
        "qsphere_image": img_base64
    }
