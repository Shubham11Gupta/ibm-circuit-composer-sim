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
import json

simulater = AerSimulator()

#Code Append Start

simulater = AerSimulator()
qc= QuantumCircuit(3,3)
qc.h(0)
qc.t(1)
qc.tdg(2)
qc.swap(0, 1)
qc.rx(0.69, 0)
qc.cx(1, 2)

#Code Append End

qc.save_statevector()
qc_t = transpile(qc, simulater)
job = simulater.run(qc_t,shots=1024)
result= job.result()
#print(result)

# Get statevector
statevector = Statevector(result.get_statevector(qc))
print("Statevector:")
print(statevector)

# Get probability distribution
probabilities = statevector.probabilities()
print("Probabilities:", probabilities)

# Plot probabilities as a bar graph and save as output_probabilities.png
plt.figure(figsize=(8, 4))
plt.bar(range(len(probabilities)), probabilities)
plt.xlabel('State Index')
plt.ylabel('Probability')
plt.title('Statevector Probabilities')
plt.tight_layout()
plt.savefig("output_probabilities.png")
plt.close()

# Plot statevector (real and imaginary parts) as a bar graph and save as output_statevector.png
real = np.real(statevector.data)
imag = np.imag(statevector.data)
indices = np.arange(len(statevector.data))
bar_width = 0.35

plt.figure(figsize=(8, 4))
plt.bar(indices - bar_width/2, real, bar_width, label='Real')
plt.bar(indices + bar_width/2, imag, bar_width, label='Imag')
plt.xlabel('State Index')
plt.ylabel('Amplitude')
plt.title('Statevector Amplitudes')
plt.legend()
plt.tight_layout()
plt.savefig("output_statevector.png")
plt.close()

# Save statevector and probabilities as JSON for frontend plotting
# Convert complex statevector to [real, imag] pairs for each amplitude
statevector_list = [[float(np.real(x)), float(np.imag(x))] for x in statevector.data]
probabilities_list = [float(p) for p in probabilities]

with open("output_data.json", "w") as f:
    json.dump({
        "statevector": statevector_list,
        "probabilities": probabilities_list
    }, f)