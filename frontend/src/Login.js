import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";
import "./styles/common.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/cribado");
    } catch (err) {
        setError("Error en el login:", err.response ? err.response.data : err.message);
      }
      
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={require("./images/login.jpg")} alt="Imagen de LogIn" />
      </div>
      <div className="login-form">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Iniciar sesión</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Login;