// src/CircuitEditor.jsx
import React, { useState } from 'react'
import GateInventory from './GateInventory'
import DropZone from './DropZone'
import './style.css'

function CircuitEditor() {
  const [qubitCount, setQubitCount] = useState(5)

  const increaseQubits = () => {
    if (qubitCount < 25) setQubitCount(qubitCount + 1)
  }

  const decreaseQubits = () => {
    if (qubitCount > 1) setQubitCount(qubitCount - 1)
  }

  return (
    <div className="circuit-editor">
      <div className="inventory-area">
        <GateInventory />
      </div>
      <div className="dropzone-area">
        <DropZone qubitCount={qubitCount} />
        <div className="controls">
          <button onClick={increaseQubits}>+</button>
          <button onClick={decreaseQubits}>-</button>
          <button>Generate Code</button>
        </div>
      </div>
    </div>
  )
}

export default CircuitEditor
