import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home"; 
import Login from "./Login";
import Register from "./Register";
import Cribado from "./Cribado";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cribado" element={<Cribado />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;