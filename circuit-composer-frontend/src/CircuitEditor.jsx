import React, { useState } from 'react';
import GateInventory from './GateInventory.jsx';
import DropZone from './DropZone';
import DeleteDrop from './DeleteDrop';
import './style.css';

const angleGates = ['Phase', 'RZ', 'RX', 'RY', 'RXX', 'RZZ'];

function CircuitEditor({ qubitCount, setQubitCount, onCircuitChange }) {
  const [gates, setGates] = useState(Array(qubitCount + 1).fill(null).map(() => Array(10).fill(null)));
  const [angleInput, setAngleInput] = useState(0.5);

  // Find if any angle gate is present in the circuit
  const angleGatePresent = gates.some(row =>
    row.some(gate => gate && angleGates.includes(gate.name))
  );

  // Update all angle gates in the circuit when angleInput changes
  React.useEffect(() => {
    if (!angleGatePresent) return;
    setGates(prevGates => {
      const updated = prevGates.map(row =>
        row.map(gate =>
          gate && angleGates.includes(gate.name)
            ? { ...gate, angle: angleInput }
            : gate
        )
      );
      return updated;
    });
  }, [angleInput]); // Only runs when angleInput changes

  // Update gates array size when qubitCount changes
  React.useEffect(() => {
    setGates(prevGates => {
      const newLength = qubitCount + 1;
      if (prevGates.length === newLength) return prevGates;
      if (prevGates.length < newLength) {
        // Add new rows
        return [
          ...prevGates,
          ...Array(newLength - prevGates.length).fill(null).map(() => Array(10).fill(null))
        ];
      } else {
        // Remove rows
        return prevGates.slice(0, newLength);
      }
    });
  }, [qubitCount]);

  // Call onCircuitChange whenever gates or qubitCount changes
  React.useEffect(() => {
    if (onCircuitChange) {
      onCircuitChange(gates, qubitCount);
    }
  }, [gates, qubitCount, onCircuitChange]);

  const increaseQubits = () => {
    if (qubitCount < 25) {
      setQubitCount(qubitCount + 1);
    }
  };

  const decreaseQubits = () => {
    if (qubitCount > 1) {
      setQubitCount(qubitCount - 1);
    }
  };

  return (
    <div className="circuit-editor">
      <div className="inventory-area">
        <GateInventory qubitCount={qubitCount} />
      </div>

      <div className="dropzone-area">
        <DropZone qubitCount={qubitCount} gates={gates} setGates={setGates} />

        <div className="controls" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <div>
            <button
              onClick={decreaseQubits}
              className="qubit-btn qubit-btn-decrease"
              title="Remove Qubit"
            >−</button>
            <button
              onClick={increaseQubits}
              className="qubit-btn qubit-btn-increase"
              title="Add Qubit"
            >＋</button>
          </div>

          {/* Delete Drop Target and angle input */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {angleGatePresent && (
              <div className="angle-input-group">
                <label htmlFor="angle-input" className="angle-label">
                  Angle
                </label>
                <input
                  id="angle-input"
                  type="number"
                  step="0.01"
                  min="-6.28"
                  max="6.28"
                  value={angleInput}
                  onChange={e => setAngleInput(parseFloat(e.target.value))}
                  className="angle-input"
                  title="Phase angle"
                />
              </div>
            )}
            <DeleteDrop gates={gates} setGates={setGates} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CircuitEditor;
