// src/GateInventory.jsx
import React from 'react'
import { useDrag } from 'react-dnd'

const gates = ['H', 'X', 'CNOT', 'T', 'S']

function Gate({ name }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'gate',
    item: { name },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }))

  return (
    <div ref={drag} className="gate-box" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {name}
    </div>
  )
}

export default function GateInventory() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
      {gates.map(gate => (
        <Gate key={gate} name={gate} />
      ))}
    </div>
  )
}
