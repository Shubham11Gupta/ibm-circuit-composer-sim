import React, { useState } from 'react';
import GateInventory from './GateInventory.jsx';
import DropZone from './DropZone';
import DeleteDrop from './DeleteDrop';
import './style.css';

function CircuitEditor({ qubitCount, setQubitCount, onCircuitChange }) {
  const [gates, setGates] = useState(Array(qubitCount + 1).fill(null).map(() => Array(10).fill(null)));

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
        <GateInventory qubitCount={qubitCount} /> {/* Pass qubitCount here */}
      </div>

      <div className="dropzone-area">
        <DropZone qubitCount={qubitCount} gates={gates} setGates={setGates} />

        <div className="controls" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <div>
            <button onClick={increaseQubits}>+</button>
            <button onClick={decreaseQubits}>-</button>
            <button>Generate Code</button>
          </div>

          {/* Delete Drop Target on extreme right */}
          <DeleteDrop gates={gates} setGates={setGates} />
        </div>
      </div>
    </div>
  );
}

export default CircuitEditor;
