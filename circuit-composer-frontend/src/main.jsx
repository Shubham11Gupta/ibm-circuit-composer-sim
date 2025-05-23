import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'
import "@fontsource/ibm-plex-sans"; // Defaults to weight 400
import "@fontsource/ibm-plex-sans/400.css"; // Specify weight
import "@fontsource/ibm-plex-sans/400-italic.css"; // Specify weight and style
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </React.StrictMode>
)