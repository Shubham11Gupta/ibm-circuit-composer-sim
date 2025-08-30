import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const emptyLabels = Array.from({ length: 8 }, (_, i) => i.toString());
const emptyData = Array(8).fill(0);

export default function OutputSection({ outputJson }) {
  // If outputJson is a string, try to parse it
  let data = outputJson;
  if (typeof outputJson === "string") {
    try {
      data = JSON.parse(outputJson);
    } catch {
      data = null;
    }
  }

  // Statevector graph data
  let statevectorChart = null;
  if (data && data.statevector && Array.isArray(data.statevector)) {
    const real = data.statevector.map((v) =>
      typeof v === "object" && v !== null && "real" in v ? v.real : (Array.isArray(v) ? v[0] : (typeof v === "number" ? v : 0))
    );
    const imag = data.statevector.map((v) =>
      typeof v === "object" && v !== null && "imag" in v ? v.imag : (Array.isArray(v) ? v[1] : 0)
    );
    const labels = real.map((_, i) => i.toString());
    statevectorChart = (
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Real",
              data: real,
              backgroundColor: "rgba(54, 162, 235, 0.7)",
            },
            {
              label: "Imaginary",
              data: imag,
              backgroundColor: "rgba(255, 99, 132, 0.7)",
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Statevector Amplitudes" },
          },
          scales: {
            x: { title: { display: true, text: "State Index" } },
            y: { title: { display: true, text: "Amplitude" } },
          },
        }}
      />
    );
  } else {
    // Show empty chart as preset
    statevectorChart = (
      <Bar
        data={{
          labels: emptyLabels,
          datasets: [
            {
              label: "Real",
              data: emptyData,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
            },
            {
              label: "Imaginary",
              data: emptyData,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Statevector Amplitudes" },
          },
          scales: {
            x: { title: { display: true, text: "State Index" } },
            y: { title: { display: true, text: "Amplitude" } },
          },
        }}
      />
    );
  }

  // Probability graph data
  let probabilityChart = null;
  if (data && data.probabilities && Array.isArray(data.probabilities)) {
    const labels = data.probabilities.map((_, i) => i.toString());
    probabilityChart = (
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Probability",
              data: data.probabilities,
              backgroundColor: "rgba(75, 192, 192, 0.7)",
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: "Statevector Probabilities" },
          },
          scales: {
            x: { title: { display: true, text: "State Index" } },
            y: { title: { display: true, text: "Probability" } },
          },
        }}
      />
    );
  } else {
    // Show empty chart as preset
    probabilityChart = (
      <Bar
        data={{
          labels: emptyLabels,
          datasets: [
            {
              label: "Probability",
              data: emptyData,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: "Statevector Probabilities" },
          },
          scales: {
            x: { title: { display: true, text: "State Index" } },
            y: { title: { display: true, text: "Probability" } },
          },
        }}
      />
    );
  }

  return (
    <div className="output-section" style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ marginTop: 0 }}>Statevector Graph</h3>
        {statevectorChart}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ marginTop: 0 }}>Probability Graph</h3>
        {probabilityChart}
      </div>
    </div>
  );
}