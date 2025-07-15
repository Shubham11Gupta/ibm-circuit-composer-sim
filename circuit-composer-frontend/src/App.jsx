import React, { useState, useEffect, useRef } from 'react'
import Split from 'react-split'
import CircuitEditor from './CircuitEditor'
import CodeSection from './CodeSection'
import './style.css'

const codeHeader = 
`
simulater = AerSimulator()
`;

const gateToQiskit = {
  Hadamard:   (row)        => `qc.h(${row})`,
  Not:        (row)        => `qc.x(${row})`,
  CNOT:       (row)        => `qc.cx(${row}, ${row+1})`,
  Toffoli:    (row)        => `qc.ccx(${row}, ${row+1}, ${row+2})`,
  SWAP:       (row)        => `qc.swap(${row}, ${row+1})`,
  Identity:   (row)        => `qc.id(${row})`,
  T:          (row)        => `qc.t(${row})`,
  S:          (row)        => `qc.s(${row})`,
  Z:          (row)        => `qc.z(${row})`,
  Tdg:        (row)        => `qc.tdg(${row})`,
  Sdg:        (row)        => `qc.sdg(${row})`,
  Phase:      (row)        => `qc.p(0.5, ${row})`,
  RZ:         (row)        => `qc.rz(0.5, ${row})`,
  Reset:      (row)        => `qc.reset(${row})`,
  Barrier:    (row)        => `qc.barrier(${row})`,
  SX:         (row)        => `qc.sx(${row})`,
  SXdg:       (row)        => `qc.sxdg(${row})`,
  Y:          (row)        => `qc.y(${row})`,
  RX:         (row)        => `qc.rx(0.5, ${row})`,
  RY:         (row)        => `qc.ry(0.5, ${row})`,
  RXX:        (row)        => `qc.rxx(0.5, ${row}, ${row+1})`,
  RZZ:        (row)        => `qc.rzz(0.5, ${row}, ${row+1})`,
  U:          (row)        => `qc.u(0.1, 0.2, 0.3, ${row})`,
  rccx:       (row)        => `qc.rccx(${row}, ${row+1}, ${row+2})`,
  rc3x:       (row)        => `qc.rc3x(${row}, ${row+1}, ${row+2}, ${row+3})`,
  Measure:    (row)        => `qc.measure(${row}, 0)`, // Only measure for the dropped row
  MeasureAll: ()           => `qc.measure_all()`,      // New gate for measure_all
}

function generateQiskitCode(gates, qubitCount) {
  let code = codeHeader + `qc= QuantumCircuit(${qubitCount},${qubitCount})\n`;
  let measureAllDropped = false;

  for (let col = 0; col < gates[0].length; col++) {
    // Special handling for Phase
    let isPhaseColumn = false;
    for (let row = 0; row < qubitCount; row++) {
      const gate = gates[row][col];
      if (gate && gate.name === 'Phase') {
        isPhaseColumn = true;
      }
    }
    if (isPhaseColumn) {
      for (let row = 0; row < qubitCount; row++) {
        code += gateToQiskit['Phase'](row) + '\n';
      }
      continue;
    }

    // Check for MeasureAll gate in this column
    for (let row = 0; row < qubitCount; row++) {
      const gate = gates[row][col];
      if (gate && gate.name === 'MeasureAll') {
        measureAllDropped = true;
        break;
      }
    }

    // For Measure, only append for the row where Measure was dropped
    for (let row = 0; row < qubitCount; row++) {
      const gate = gates[row][col];
      if (gate && gate.name === 'Measure') {
        code += gateToQiskit['Measure'](row) + '\n';
      }
    }

    // Otherwise, handle all other gates except Measure and MeasureAll
    for (let row = 0; row < qubitCount; row++) {
      const gate = gates[row][col];
      if (!gate || !gate.root) continue;
      const fn = gateToQiskit[gate.name];
      if (fn && gate.name !== 'Measure' && gate.name !== 'MeasureAll') code += fn(row) + '\n';
    }
  }

  // If MeasureAll was dropped anywhere, append qc.measure_all()
  if (measureAllDropped) {
    code += gateToQiskit['MeasureAll']() + '\n';
  }

  return code;
}

function App() {
  const [qubitCount, setQubitCount] = useState(5);
  const [code, setCode] = useState(codeHeader + `qc= QuantumCircuit(5)\n`);
  const [userEdited, setUserEdited] = useState(false);
  const [output, setOutput] = useState(''); // <-- Add output state

  // Called by CircuitEditor when gates change
  const handleCircuitChange = (gates, newQubitCount) => {
    setQubitCount(newQubitCount);
    if (!userEdited) {
      setCode(generateQiskitCode(gates, newQubitCount));
    }
    // Only update code if user hasn't edited manually
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    setUserEdited(true); // Mark as user-edited
  };

  const handleSubmit = async () => {
    setOutput('Submitting...');
    try {
      const res = await fetch('http://localhost:8000/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setOutput(data.ack || JSON.stringify(data));
    } catch (err) {
      setOutput('Error: ' + err.message);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>IBM Quantum Circuit Composer Simulator</h1>
      </header>
      <Split className="split-view" sizes={[65, 35]} minSize={200} gutterSize={6}>
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
              <p>{output || "This is the output section."}</p>
            </div>
          </Split>
        </div>
        <CodeSection code={code} onCodeChange={handleCodeChange} onSubmit={handleSubmit} />
      </Split>
    </div>
  )
}

export default App
