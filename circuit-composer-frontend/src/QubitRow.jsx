// src/QubitRow.jsx
import React from 'react'
import { useDrop } from 'react-dnd'
import Gate from './Gate'
import './style.css'

export default function QubitRow({ index, gates, setGates }) {
  const totalQubitRows = gates.length - 1 // last row is classical

  const [, drop] = useDrop(() => ({
    accept: 'gate',
    drop: (item) => {
      const span = item.span || 1
      const isPhase = item.name === 'Phase'
      const actualSpan = isPhase ? totalQubitRows : span

      // Only allow if gate fits in available rows
      if (index + actualSpan > totalQubitRows) return

      // Find the next available slot (column) in this row
      const nextSlot = gates[index].findIndex((g, col) => {
        // Check for measure above in this column
        for (let r = 0; r <= index; r++) {
          if (gates[r][col] && gates[r][col].name === 'Measure') return false
        }
        return g === null
      })
      if (nextSlot === -1) return

      // Check all rows in the span for slot availability and measure above
      for (let i = 0; i < actualSpan; i++) {
        // Check for measure above in this column
        for (let r = 0; r <= index + i; r++) {
          if (gates[r][nextSlot] && gates[r][nextSlot].name === 'Measure') return
        }
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
      for (let i = 0; i < actualSpan; i++) {
        updated[index + i][nextSlot] = {
          id: gateId,
          name: item.name,
          span: actualSpan,
          root: i === 0 // Only the top row is the root for rendering
        }
      }

      setGates(updated)
    }
  }), [gates, index, setGates])

  // Helper: for rendering, check if this cell is disabled due to measure above
  function isCellDisabled(col) {
    for (let r = 0; r <= index; r++) {
      if (gates[r][col] && gates[r][col].name === 'Measure') return true
    }
    return false
  }

  return (
    <div className="qubit-row" ref={drop}>
      <div className="qubit-label">q[{index}]</div>
      <div className="qubit-gates">
        {gates[index].map((gate, col) =>
          gate ? (
            <Gate
              key={gate.id || `${gate.name}-${col}`}
              gate={gate}
              row={index}
              col={col}
              setGates={setGates}
              gates={gates}
            />
          ) : (
            <div
              className="gate-slot"
              key={col}
              style={isCellDisabled(col) ? { background: "#eee", opacity: 0.5, pointerEvents: "none" } : {}}
            />
          )
        )}
      </div>
    </div>
  )
}
