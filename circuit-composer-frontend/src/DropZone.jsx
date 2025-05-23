import React from 'react';
import QubitRow from './QubitRow';
import ClassicalRow from './ClassicalRow';

export default function DropZone({ qubitCount, gates, setGates }) {
    const classicalRowName = `c${qubitCount}`;
  return (
    <div className="dropzone">
      {Array.from({ length: qubitCount }, (_, i) => (
        <QubitRow
          key={i}
          index={i}
          gates={gates}
          setGates={setGates}
        />
      ))}
      {/* Classical row always at the bottom */}
      <ClassicalRow
        key="classical"
        index={qubitCount}
        gates={gates}
        setGates={setGates}
        label={classicalRowName}
      />
    </div>
  );
}
