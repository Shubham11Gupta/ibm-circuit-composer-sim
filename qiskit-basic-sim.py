from qiskit import QuantumCircuit
from qiskit.providers.basic_provider import BasicSimulator
from qiskit.quantum_info import Statevector
import matplotlib.pyplot as plt
from qiskit.visualization import plot_histogram
simulater = BasicSimulator()

qc= QuantumCircuit(2,2)
qc.h(1)
qc.measure(1,1)
qc.x(0)
qc.measure(0,0)
qc.draw()

plt.show()