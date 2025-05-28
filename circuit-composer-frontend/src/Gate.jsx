// src/Gate.jsx
import React from 'react'
import { useDrag } from 'react-dnd'

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

  return (
    <div
      ref={gate.root ? drag : null}
      className={`gate-slot filled${gate.span > 1 ? ' multi-span' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {gate.root ? gate.name : <span className="gate-span-connector" />}
    </div>
  )
}
