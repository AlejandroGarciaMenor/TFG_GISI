import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home"; 
import Login from "./Login";
import Register from "./Register";
import Cribado from "./Cribado";
import Gravedad from "./Gravedad";
import Chatbot from "./Chatbot";
import PerfilUsuario from "./PerfilUsuario";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cribado" element={<Cribado />} />
          <Route path="/gravedad" element={<Gravedad />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/perfil-usuario" element={<PerfilUsuario />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;