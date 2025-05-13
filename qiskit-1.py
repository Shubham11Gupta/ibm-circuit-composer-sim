from qiskit import QuantumCircuit
import qiskit.quantum_info as qi
import matplotlib.pyplot as plt
from qiskit.visualization import plot_histogram

qc= QuantumCircuit(2)
qc.h(1)
qc.cx(1,0)
qc.draw('mpl')
psi = qi.Statevector(qc)
print(psi)
probabilities = psi.probabilities()
print(probabilities)
counts = psi.sample_counts(100000)
print(counts)
plot_histogram(counts)
samples = psi.sample_memory(10)
print(samples) 


O = qi.SparsePauliOp(['XX','YY','ZZ'],[0.2,-0.3,0.4   ])
print(O)
o_exp = psi.expectation_value(O)
print(o_exp)

psi.draw('bloch')
plt.show()