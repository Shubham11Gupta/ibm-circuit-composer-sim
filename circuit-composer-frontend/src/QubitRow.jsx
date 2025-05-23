import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import './style.css'

export default function QubitRow({ index }) {
  const [gates, setGates] = useState(Array(10).fill(null)) // 10 time slots

  const [, drop] = useDrop(() => ({
    accept: 'gate',
    drop: (item) => {
      const nextSlot = gates.findIndex(g => g === null)
      if (nextSlot !== -1) {
        const updated = [...gates]
        updated[nextSlot] = item.name
        setGates(updated)
      }
    }
  }), [gates])

  return (
    <div className="qubit-row" ref={drop}>
      <div className="qubit-label">q[{index}]</div>
      <div className="qubit-gates">
        {gates.map((gate, i) => (
          <div className="gate-slot" key={i}>
            {gate && <div className="gate-box">{gate}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
