import React from "react";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Plant Monitor</h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
