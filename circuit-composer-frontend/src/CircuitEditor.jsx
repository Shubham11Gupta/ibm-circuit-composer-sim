// src/CircuitEditor.jsx
import React, { useState } from 'react'
import GateInventory from './GateInventory'
import DropZone from './DropZone'
import DeleteDrop from './DeleteDrop'
import './style.css'

function CircuitEditor() {
  const [qubitCount, setQubitCount] = useState(5)
  const [gates, setGates] = useState(
    Array(5).fill(null).map(() => Array(10).fill(null))
  )

  const increaseQubits = () => {
    if (qubitCount < 25) {
      setQubitCount(qubitCount + 1)
      setGates([...gates, Array(10).fill(null)])
    }
  }

  const decreaseQubits = () => {
    if (qubitCount > 1) {
      setQubitCount(qubitCount - 1)
      setGates(gates.slice(0, -1))
    }
  }

  return (
    <div className="circuit-editor">
      <div className="inventory-area">
        <GateInventory />
      </div>

      <div className="dropzone-area">
        <DropZone qubitCount={qubitCount} gates={gates} setGates={setGates} />

        <div className="controls">
          <div>
            <button onClick={increaseQubits}>+</button>
            <button onClick={decreaseQubits}>-</button>
            <button>Generate Code</button>
          </div>
          <div className="delete-area">
            <DeleteDrop gates={gates} setGates={setGates} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CircuitEditor
