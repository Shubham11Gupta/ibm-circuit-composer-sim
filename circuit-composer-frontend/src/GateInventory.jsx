// src/GateInventory.jsx
import React from 'react'
import { useDrag } from 'react-dnd'
import gates from './gateInventory.js'

// Map gate names to symbols
const gateSymbols = {
  Hadamard: 'H',
  Not: 'X',
  CNOT: 'C',
  Toffoli: 'T',
  SWAP: 'SW',
  Identity: 'I',
  T: 'T',
  S: 'S',
  Z: 'Z',
  Tdg: 'T†',
  Sdg: 'S†',
  Phase: 'P',
  RZ: 'RZ',
  Reset: 'R',
  Barrier: '||',
  SX: 'SX',
  SXdg: 'SX†',
  Y: 'Y',
  RX: 'RX',
  RY: 'RY',
  RXX: 'RXX',
  RZZ: 'RZZ',
  U: 'U',
  rccx: 'rccx',
  rc3x: 'rc3x'
}

function Gate({ gate }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'gate',
    item: { name: gate.name, span: gate.span },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }))

  // Convert name to lowercase for CSS class
  const gateClass = `gate-inventory-block gate-${gate.name.toLowerCase()}`

  return (
    <div
      ref={drag}
      className={gateClass}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      title={gate.name}
    >
      {gateSymbols[gate.name] || gate.name[0]}
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
