// src/gateInventory.js
const gateInventory = [
  { name: 'Hadamard', span: 1 },
  { name: 'Not', span: 1 },
  { name: 'CNOT', span: 2 },
  { name: 'Toffoli', span: 3 },
  { name: 'SWAP', span: 2 },
  { name: 'Identity', span: 1 },
  { name: 'T', span: 1 },
  { name: 'S', span: 1 },
  { name: 'Z', span: 1 },
  { name: 'Tdg', span: 1 },
  { name: 'Sdg', span: 1 },
  { name: 'RZ', span: 1 },
  { name: 'Reset', span: 1 },
  { name: 'Barrier', span: 1 },
  { name: 'SX', span: 1 },
  { name: 'SXdg', span: 1 },
  { name: 'Y', span: 1 },
  { name: 'RX', span: 1 },
  { name: 'RY', span: 1 },
  { name: 'RXX', span: 2 },
  { name: 'RZZ', span: 2 },
  { name: 'U', span: 1 },
  { name: 'rccx', span: 3 },
  { name: 'rc3x', span: 4 },
  { name: 'Phase', span: 1 },
  { name: 'Measure', span: 1 },      // Existing Measure gate
  { name: 'MeasureAll', span: 1 },   // <-- Added MeasureAll gate
];

export default gateInventory;
