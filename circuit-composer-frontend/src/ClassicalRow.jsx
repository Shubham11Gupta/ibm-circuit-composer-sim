// src/ClassicalRow.jsx
import React from 'react';

export default function ClassicalRow({ index, gates, setGates, label }) {
  // Defensive: if gates not ready, render nothing
  if (!gates || !gates[index]) return null;

  return (
    <div className="qubit-row classical-row">
      <div className="qubit-label">{label}</div>
      <div className="qubit-gates">
        {gates[index].map((gate, col) => (
          <div key={col} />
        ))}
      </div>
    </div>
  );
}
