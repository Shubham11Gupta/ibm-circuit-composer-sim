// src/QubitRow.jsx
import React from 'react'
import { useDrop } from 'react-dnd'
import Gate from './Gate'
import './style.css'

export default function QubitRow({ index, gates, setGates }) {
  const [, drop] = useDrop(() => ({
    accept: 'gate',
    drop: (item) => {
      const span = item.span || 1
      const totalQubitRows = gates.length - 1 // last row is classical

      // Only allow if gate fits in available rows
      if (index + span > totalQubitRows) return

      // Find the next available slot (column) in this row
      const nextSlot = gates[index].findIndex(g => g === null)
      if (nextSlot === -1) return

      // Check all rows in the span for slot availability
      for (let i = 0; i < span; i++) {
        if (gates[index + i][nextSlot] !== null) return
      }

      const updated = gates.map(row => [...row])

      if (item.from === 'row') {
        // Remove old gate from all spanned rows
        if (item.span && item.span > 1) {
          for (let i = 0; i < item.span; i++) {
            if (updated[item.row + i]) updated[item.row + i][item.col] = null
          }
        } else {
          updated[item.row][item.col] = null
        }
      }

      // Place new gate in all spanned rows
      const gateId = item.id || crypto.randomUUID()
      for (let i = 0; i < span; i++) {
        updated[index + i][nextSlot] = {
          id: gateId,
          name: item.name,
          span: span,
          root: i === 0 // Only the top row is the root for rendering
        }
      }

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
            key={gate.id || `${gate.name}-${col}`}
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
