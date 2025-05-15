from qiskit import QuantumCircuit
from qiskit.providers.basic_provider import BasicSimulator
from qiskit.quantum_info import Statevector
import matplotlib.pyplot as plt
from qiskit.visualization import plot_distribution
from qiskit.circuit.library import QFT
from qiskit import transpile
simulater = BasicSimulator()
'''
qc= QuantumCircuit(2,2)
qc.h(1)
qc.measure(1,1)
qc.x(0)
qc.measure(0,0)
qc.draw("mpl")'''

qc=QuantumCircuit(3,3)
qc.append(QFT(3),range(3))
qc.measure(range(3),range(3))
qc.draw('mpl')
qc_t = transpile(qc,simulater)
qc_t.draw('mpl')

job = simulater.run(qc_t,shots=10,memory=True)
result = job.result()
counts = result.get_counts()
memory=result.get_memory()
print(memory)
print(counts)
plot_distribution(counts)

plt.show()