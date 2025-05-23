// src/DropZone.jsx
import React from 'react'
import QubitRow from './QubitRow'
import './style.css'

export default function DropZone({ qubitCount }) {
  return (
    <div className="dropzone">
      {[...Array(qubitCount)].map((_, i) => (
        <QubitRow key={i} index={i} type="qubit" />
      ))}
      <QubitRow index={qubitCount} type="classical" />
    </div>
  )
}
