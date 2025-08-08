// src/Gate.jsx
import React from 'react'
import { useDrag } from 'react-dnd'

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

export default function Gate({ gate, row, col }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'gate',
    item: { 
      id: gate?.id, 
      name: gate?.name, 
      span: gate?.span, 
      from: 'row', 
      row, 
      col 
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }), [gate])

  if (!gate) return <div className="gate-slot" />

  const gateClass = `gate-block gate-${gate.name.toLowerCase()}`

  return (
    <div
      ref={gate.root ? drag : null}
      className={gateClass}
      style={{ opacity: isDragging ? 0.5 : 1, position: 'relative' }}
      title={gate.name}
    >
      {gate.root ? (
        <>
          <span>{gateSymbols[gate.name] || gate.name[0]}</span>
          {gate.span > 1 && (
            <span className="gate-span-vertical" style={{
              position: 'absolute',
              left: '50%',
              top: '100%',
              width: '2px',
              height: `calc(40px * ${gate.span - 1})`,
              background: '#4caf50',
              transform: 'translateX(-50%)'
            }} />
          )}
        </>
      ) : (
        <span className="gate-span-connector" style={{
          width: '2px',
          height: '100%',
          background: '#4caf50',
          display: 'block',
          margin: '0 auto'
        }} />
      )}
    </div>
  )
}
