import React, { useState, useEffect, useRef } from 'react'
import Split from 'react-split'
import CircuitEditor from './CircuitEditor'
import CodeSection from './CodeSection'
import './style.css'

const codeTemplate = (n) => 
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
qc= QuantumCircuit(${n})
`;

function App() {
  const [qubitCount, setQubitCount] = useState(5);
  const [code, setCode] = useState(codeTemplate(5));
  const [userEdited, setUserEdited] = useState(false);
  const prevQubitCount = useRef(qubitCount);

  useEffect(() => {
    if (!userEdited) {
      setCode(codeTemplate(qubitCount));
    }
    prevQubitCount.current = qubitCount;
  }, [qubitCount, userEdited]);

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
              <CircuitEditor qubitCount={qubitCount} setQubitCount={setQubitCount} />
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
