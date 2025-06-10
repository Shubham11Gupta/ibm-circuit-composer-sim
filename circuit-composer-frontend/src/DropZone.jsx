import React from 'react'
import QubitRow from './QubitRow'
import ClassicalRow from './ClassicalRow'

export default function DropZone({ qubitCount, gates, setGates }) {
  return (
    <div className="dropzone">
      {[...Array(qubitCount)].map((_, i) => (
        <QubitRow key={i} index={i} gates={gates} setGates={setGates} />
      ))}
      <ClassicalRow index={qubitCount} gates={gates} setGates={setGates} label={`c${qubitCount}`} />
    </div>
  )
}
