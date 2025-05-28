// src/GateInventory.jsx
import React from 'react'
import { useDrag } from 'react-dnd'
import gates from './gateInventory.js' // Make sure this exports an array of objects like { name: 'CNOT', span: 2 }

function Gate({ gate }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'gate',
    item: { name: gate.name, span: gate.span },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }))

  return (
    <div ref={drag} className="gate-box" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {gate.name}
    </div>
  )
}

export default function GateInventory() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
      {gates.map(gate => (
        <Gate key={gate.name} gate={gate} />
      ))}
    </div>
  )
}
