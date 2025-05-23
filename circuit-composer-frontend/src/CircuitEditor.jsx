import React, { useState } from 'react';
import GateInventory from './GateInventory';
import DropZone from './DropZone';
import DeleteDrop from './DeleteDrop';
import './style.css';

function CircuitEditor() {
  const [qubitCount, setQubitCount] = useState(5);
  const [gates, setGates] = useState(Array(qubitCount + 1).fill(null).map(() => Array(10).fill(null)));

  const increaseQubits = () => {
    if (qubitCount < 25) {
      setQubitCount(qubitCount + 1);
      setGates((prevGates) => [...prevGates, Array(10).fill(null)]);
    }
  };

  const decreaseQubits = () => {
    if (qubitCount > 1) {
      setQubitCount(qubitCount - 1);
      setGates((prevGates) => prevGates.slice(0, -1));
    }
  };

  return (
    <div className="circuit-editor">
      <div className="inventory-area">
        <GateInventory />
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
