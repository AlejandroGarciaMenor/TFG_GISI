import React from "react";
import { Link } from "react-router-dom";
import "./styles/Home.css"; 

function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenido a la Aplicación de Salud Mental</h1>
      <p>Esta aplicación te ayudará a saber si puedes tener un trastorno de ansiedad.</p>
      <div className="home-links">
        <Link to="/login" className="home-link">Login</Link>
        <Link to="/register" className="home-link">Registrarse</Link>
      </div>
      <div>
        <p>Explicación de lo que contiene esta aplicación web...</p>
      </div>
    </div>
  );
}

export default Home;