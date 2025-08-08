import React from 'react'

export default function CodeSection({ code, onCodeChange, onSubmit }) {
  return (
    <div className="code-section">
      <label htmlFor="code-editor" style={{ fontWeight: 'bold', marginBottom: 4, display: 'block' }}>
        Qiskit Code Editor
      </label>
      <textarea
        id="code-editor"
        value={code}
        onChange={onCodeChange}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  )
}