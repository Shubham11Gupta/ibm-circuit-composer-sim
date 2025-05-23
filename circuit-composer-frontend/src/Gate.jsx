import React from 'react'
import { useDrag } from 'react-dnd'

export default function Gate({ gate, row, col, setGates, gates }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'gate',
    item: {
      type: 'gate',
      id: gate?.id,
      name: gate?.name,
      row,
      col,
      from: 'row',
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }), [gate])

  if (!gate) return <div className="gate-slot" />

  return (
    <div ref={drag} className="gate-slot">
      <div className="gate-box" style={{ opacity: isDragging ? 0.5 : 1 }}>
        {gate.name}
      </div>
    </div>
  )
}
