import React from 'react'
import { useDrop } from 'react-dnd'
import './style.css'

export default function DeleteDrop({ gates, setGates }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'gate',
    drop: (item) => {
      const updated = [...gates]
      if (item.from === 'row') {
        updated[item.row][item.col] = null
        setGates(updated)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }))

  return (
    <div ref={drop} className="delete-drop" style={{ backgroundColor: isOver ? '#fdd' : '#fee' }}>
      🗑 Delete Gate
    </div>
  )
}
