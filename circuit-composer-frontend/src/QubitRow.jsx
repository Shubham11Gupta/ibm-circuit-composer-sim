// src/QubitRow.jsx
import React from 'react'
import { useDrop } from 'react-dnd'
import Gate from './Gate'
import './style.css'

export default function QubitRow({ index, gates, setGates }) {
  const [, drop] = useDrop(() => ({
    accept: 'gate',
    drop: (item) => {
      const nextSlot = gates[index].findIndex(g => g === null)
      if (nextSlot === -1) return

      const updated = [...gates.map(row => [...row])]
      
      if (item.from === 'row') {
        // Skip if dragging to the same position
        if (item.row === index && item.col === nextSlot) return

        // Clear old slot
        updated[item.row][item.col] = null
      }

      // Place new gate
      updated[index][nextSlot] = { id: item.id || crypto.randomUUID(), name: item.name }
      setGates(updated)
    }
  }), [gates])

  return (
    <div className="qubit-row" ref={drop}>
      <div className="qubit-label">q[{index}]</div>
      <div className="qubit-gates">
        {gates[index]
        .map((gate, col) => ({ gate, col }))
        .filter(({ gate }) => gate !== null)
        .map(({ gate, col }, i) => (
            <Gate
            key={i}
            gate={gate}
            row={index}
            col={col}
            setGates={setGates}
            gates={gates}
            />
        ))}
      </div>
    </div>
  )
}
