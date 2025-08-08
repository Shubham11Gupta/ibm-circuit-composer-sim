// src/DeleteDrop.jsx
import React from 'react'
import { useDrop } from 'react-dnd'

export default function DeleteDrop({ gates, setGates }) {
  const [, drop] = useDrop(() => ({
    accept: 'gate',
    drop: (item) => {
      if (item.from === 'row') {
        const updated = gates.map(row => [...row])
        const span = item.span || 1
        for (let i = 0; i < span; i++) {
          if (updated[item.row + i]) updated[item.row + i][item.col] = null
        }
        setGates(updated)
      }
    }
  }), [gates])

  return (
    <div ref={drop} className="delete-drop">
      🗑️ Delete Gate
    </div>
  )
}
