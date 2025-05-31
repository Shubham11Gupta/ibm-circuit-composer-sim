// src/GateInventory.jsx
import React from 'react'
import { useDrag } from 'react-dnd'
import gates from './gateInventory.js'

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

export default function GateInventory({ qubitCount }) {
  // Dynamically set Phase gate's span to qubitCount
  const dynamicGates = gates.map(gate =>
    gate.name === 'Phase' ? { ...gate, span: qubitCount } : gate
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
      {dynamicGates.map(gate => (
        <Gate key={gate.name} gate={gate} />
      ))}
    </div>
  )
}
