from qiskit import QuantumCircuit
import matplotlib.pyplot as plt

qc= QuantumCircuit(2)
qc.h(1)
qc.cx(1,0)
qc.draw('mpl')

plt.show()