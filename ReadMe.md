# IBM Circuit Composer Simulator

A full-stack quantum circuit composer and simulator inspired by IBM Quantum Composer. This project allows users to visually build quantum circuits, generate Qiskit code, simulate the circuit, and view both the statevector and probability graphs interactively.

---

## 🚀 Features

- **Drag-and-drop Quantum Circuit Editor:**  
  Build circuits visually with gates like H, X, CNOT, Toffoli, Phase, RZ, RX, RY, RXX, RZZ, and more.
- **Qiskit Code Generation:**  
  Instantly see the Qiskit code for your circuit, editable in the browser.
- **Backend Simulation:**  
  Python backend runs your Qiskit code, simulates the circuit, and returns results.
- **Interactive Graphs:**  
  View statevector amplitudes (real/imaginary) and probability distributions as interactive charts.
- **Custom Phase Angles:**  
  For gates like Phase, RZ, RX, RY, RXX, RZZ, set the angle via UI and see it reflected in the code and simulation.
- **Delete & Reset:**  
  Remove gates or reset the circuit easily.
- **Live Output:**  
  See simulation results and graphs update instantly after submitting.

---

## 🛠 Tech Stack

- **Frontend:** React, react-chartjs-2, Chart.js, CSS
- **Backend:** FastAPI (Python), Qiskit, Matplotlib, NumPy
- **Containerization:** Docker, Docker Compose

---

## 🐳 Installation & Running (with Docker Compose)

### 1. **Clone the repository**
```sh
git clone https://github.com/Shubham11Gupta/ibm-circuit-composer-sim.git
cd ibm-circuit-composer-sim
```

### 2. **Build and start the containers**
```sh
docker-compose up --build
```
- This will start both the frontend (React) and backend (FastAPI + Qiskit) containers.

### 3. **Access the app**
- Open your browser and go to: [http://localhost:3000](http://localhost:3000)

### 4. **Stopping the app**
```sh
docker-compose down
```

---

## 🖼️ Screenshots

- **Circuit Editor:** Drag and drop gates to build your quantum circuit.
- **Qiskit Code:** See and edit the generated Qiskit code.
- **Output Section:** View statevector and probability graphs side by side.

<img src="circuit-composer-frontend\src\assets\qcc2.png">

---

## ⚙️ Project Structure

```
ibm-circuit-composer-sim/
├── circuit-composer-frontend/   # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── OutputSection.jsx
│   │   ├── ... (other components)
│   │   └── style.css
├── circuit-composer-backend/    # FastAPI + Qiskit backend
│   ├── main.py
│   ├── quantum_sim.py
│   └── ...
├── docker-compose.yml
└── README.md
```

---

## 📝 How it Works

1. **Build your circuit** using the drag-and-drop editor.
2. **Edit or review the Qiskit code** generated in real-time.
3. **Submit** the circuit/code for simulation.
4. **Backend runs the simulation** using Qiskit and returns:
    - Statevector (as array and graph)
    - Probabilities (as array and graph)
5. **Frontend displays interactive graphs** using Chart.js.

---

## 🧑‍💻 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---


## 🙏 Acknowledgements

- IBM Quantum Composer (for inspiration)
- Qiskit
- FastAPI