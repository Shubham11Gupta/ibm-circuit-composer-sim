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

  // Only root is draggable and shows the name, others show connector
  return (
    <div
      ref={gate.root ? drag : null}
      className={`gate-slot filled${gate.span > 1 ? ' multi-span' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1, position: 'relative' }}
    >
      {gate.root ? (
        <>
          <span>{gate.name}</span>
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
        // Connector only
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
