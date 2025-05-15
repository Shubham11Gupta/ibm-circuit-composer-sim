from qiskit import QuantumCircuit
from qiskit.circuit.library import HGate
from qiskit.providers.basic_provider import BasicSimulator
from qiskit.quantum_info import Statevector
import matplotlib.pyplot as plt
from qiskit.visualization import plot_distribution
from qiskit.circuit.library import QFT
from qiskit import transpile
from qiskit_aer import Aer,AerSimulator
simulater = AerSimulator()

n=29
qc= QuantumCircuit(n)
qc.h(n-1)
for i in range(n-1):
    qc.cx(i,n-1)
qc.measure_all()
#qc.draw("mpl")
qc_t = transpile(qc,simulater)


job = simulater.run(qc_t,shots=1000,method='matrix_product_state')
result= job.result()
#statevector = result.get_statevector()
#print(statevector)
counts = result.get_counts()
print(counts)

plt.show()