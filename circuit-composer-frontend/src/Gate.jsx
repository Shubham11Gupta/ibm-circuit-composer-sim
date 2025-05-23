// src/Gate.jsx
import React from 'react'
import { useDrag } from 'react-dnd'

export default function Gate({ gate, row, col }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'gate',
    item: { id: gate?.id, name: gate?.name, from: 'row', row, col },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }), [gate])

  if (!gate) return <div className="gate-slot" />

  return (
    <div
      ref={drag}
      className="gate-slot filled"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {gate.name}
    </div>
  )
}
