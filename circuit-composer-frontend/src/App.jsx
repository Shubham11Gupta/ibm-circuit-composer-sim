import React, { useState, useEffect, useRef } from 'react'
import Split from 'react-split'
import CircuitEditor from './CircuitEditor'
import CodeSection from './CodeSection'
import './style.css'

const codeHeader = 
`from qiskit import QuantumCircuit
from qiskit.circuit.library import HGate
from qiskit.providers.basic_provider import BasicSimulator
from qiskit.quantum_info import Statevector
import matplotlib.pyplot as plt
from qiskit.visualization import plot_distribution
from qiskit.circuit.library import QFT
from qiskit import transpile
from qiskit_aer import Aer,AerSimulator
simulater = AerSimulator()
`;

function generateQiskitCode(gates, qubitCount) {
  let code = codeHeader + `qc= QuantumCircuit(${qubitCount})\n`;
  // gates: [row][col]
  for (let col = 0; col < gates[0].length; col++) {
    // Check if any row has a Phase gate at this column
    let isPhaseColumn = false;
    for (let row = 0; row < qubitCount; row++) {
      const gate = gates[row][col];
      if (gate && gate.name === 'Phase') {
        isPhaseColumn = true;
        break;
      }
    }
    if (isPhaseColumn) {
      // Apply Phase to all qubits at this column
      for (let row = 0; row < qubitCount; row++) {
        code += `qc.p(0.5, ${row})\n`; // 0.5 is an example phase angle
      }
      continue; // Skip other gates in this column
    }
    // Otherwise, handle other gates as usual
    for (let row = 0; row < qubitCount; row++) {
      const gate = gates[row][col];
      if (!gate) continue;
      // Example: handle Hadamard
      if (gate.name === 'H') code += `qc.h(${row})\n`;
      // Add more gate mappings here as needed
      // if (gate.name === 'X') code += `qc.x(${row})\n`;
      if (gate.name === 'CNOT') code += `qc.cx(${row}, ${row+1})\n`;
    }
  }
  return code;
}

function App() {
  const [qubitCount, setQubitCount] = useState(5);
  const [code, setCode] = useState(codeHeader + `qc= QuantumCircuit(5)\n`);
  const [userEdited, setUserEdited] = useState(false);

  // Called by CircuitEditor when gates change
  const handleCircuitChange = (gates, newQubitCount) => {
    setQubitCount(newQubitCount);
    setCode(generateQiskitCode(gates, newQubitCount));
    setUserEdited(false);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    setUserEdited(true);
  };

  const handleSubmit = () => {
    alert('Submitted code:\n' + code);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>IBM Quantum Circuit Composer Simulator</h1>
      </header>
      <Split className="split-view" sizes={[70, 30]} minSize={200} gutterSize={6}>
        <div className="display">
          <Split
            direction="vertical"
            className="vertical-split"
            sizes={[50, 50]}
            minSize={100}
            gutterSize={6}
          >
            <div className="circuit">
              <CircuitEditor
                qubitCount={qubitCount}
                setQubitCount={setQubitCount}
                onCircuitChange={handleCircuitChange}
              />
            </div>
            <div className="output">
              <p>This is the output section.</p>
            </div>
          </Split>
        </div>
        <CodeSection code={code} onCodeChange={handleCodeChange} onSubmit={handleSubmit} />
      </Split>
    </div>
  )
}

export default App
