// src/DeleteDrop.jsx
import React from 'react'
import { useDrop } from 'react-dnd'

export default function DeleteDrop({ gates, setGates }) {
  const [, drop] = useDrop(() => ({
    accept: 'gate',
    drop: (item) => {
      if (item.from === 'row') {
        const updated = [...gates]
        updated[item.row][item.col] = null
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
