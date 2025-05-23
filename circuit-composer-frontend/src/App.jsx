import React from 'react'
import Split from 'react-split'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import CircuitEditor from './CircuitEditor'
import './style.css'

function App() {
  return (
     <div className="app-container">
      <header className="header">
        <h1>IBM Quantum Circuit Composer Simulator</h1>
      </header>

      <Split className="split-view" sizes={[70, 30]} minSize={200} gutterSize={6}>
        <div className="display">
          {/* Left side (visual circuit display) */}
          <div className="display">
            <Split
              direction="vertical"
              className="vertical-split"
              sizes={[50, 50]}
              minSize={100}
              gutterSize={6}
            >
              <div className="circuit">
                <CircuitEditor />
              </div>
              <div className="output">
                <p>This is the output section.</p>
              </div>
            </Split>
          </div>
        </div>
        <div className="code-section">
          {/* Right side (Qiskit code) */}
          <p>Qiskit code editor will go here.</p>
        </div>
      </Split>
    </div>
  )
}

export default App
