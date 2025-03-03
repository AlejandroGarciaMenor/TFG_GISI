import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";
import "./styles/common.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [codigo, setCodigo] = useState("");
  const [show2FA, setShow2FA] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      if (res.data.message === "Código de verificación enviado") {	
        setShow2FA(true);
      } else {
        localStorage.setItem("token", res.data.token);
        sessionStorage.setItem("nombre", res.data.nombre);
        navigate("/cribado");
      }
    } catch (err) {
        setError("Error en el login:", err.response ? err.response.data : err.message);
      }
      
  };

  const handle2FA = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/verificar-2fa", { email, codigo });
      localStorage.setItem("token", res.data.token);
      sessionStorage.setItem("nombre", res.data.nombre);
      navigate("/cribado");
    } catch (err) {
      setError("Error en la verificación:", err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={require("./images/login.jpg")} alt="Imagen de LogIn" />
      </div>
      <div className="login-form">
        <h2>{show2FA ? "Verificar Código 2FA" : "Iniciar sesión"}</h2>
        {!show2FA ? (
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Iniciar sesión</button>
          </form>
        ) : (
          <form onSubmit={handle2FA}>
            <p>Código de verificación enviado a tu correo. Introducelo.</p>
            <input type="text" placeholder="Código 2FA" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
            <button type="submit">Verificar</button>
          </form>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Login;