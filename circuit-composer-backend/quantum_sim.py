from qiskit import QuantumCircuit
from qiskit.circuit.library import HGate
from qiskit.providers.basic_provider import BasicSimulator
from qiskit.quantum_info import Statevector
import matplotlib.pyplot as plt
from qiskit.visualization import plot_distribution, plot_state_qsphere
from qiskit.circuit.library import QFT
from qiskit import transpile
from qiskit_aer import Aer, AerSimulator
import numpy as np

simulater = AerSimulator()

#Code Append Start

simulater = AerSimulator()
qc= QuantumCircuit(5)
qc.h(0)
qc.cx(0, 1)

#Code Append End

statevector_sim = AerSimulator(method='statevector')
qc_t = transpile(qc, simulater)
job = simulater.run(qc_t,shots=1024)
result= job.result()
print(result)

# Get statevector
statevector = Statevector(result.get_statevector(qc))
print("Statevector:")
print(statevector)

# Get probability distribution
probabilities = statevector.probabilities()
print("Probabilities:", probabilities)