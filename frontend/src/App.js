import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SensorStatus from "./components/SensorStatus";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Plant Monitor</h1>
          <SensorStatus />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
      <p
        style={{
          textAlign: "center",
          fontSize: "0.9rem",
          color: "#555",
          marginTop: "1rem",
        }}
      >
        Note: All data displayed prior to August 16th is test data. Live data
        from the Raspberry Pi has been inserted starting August 16th.
      </p>
    </Router>
  );
}

export default App;
