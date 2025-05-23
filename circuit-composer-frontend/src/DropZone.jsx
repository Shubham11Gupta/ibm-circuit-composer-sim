// src/DropZone.jsx
import React, { useState } from 'react'
import QubitRow from './QubitRow'
import DeleteDrop from './DeleteDrop'

export default function DropZone({ qubitCount }) {
  const [gates, setGates] = useState(
    Array(qubitCount).fill(null).map(() => Array(10).fill(null))
  )

  React.useEffect(() => {
    setGates(prev => {
      const newGates = Array(qubitCount).fill(null).map(() => Array(10).fill(null))
      for (let i = 0; i < Math.min(prev.length, newGates.length); i++) {
        newGates[i] = [...prev[i]]
      }
      return newGates
    })
  }, [qubitCount])

  return (
    <div>
      {gates.map((_, i) => (
        <QubitRow key={i} index={i} gates={gates} setGates={setGates} />
      ))}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <DeleteDrop gates={gates} setGates={setGates} />
      </div>
    </div>
  )
}
