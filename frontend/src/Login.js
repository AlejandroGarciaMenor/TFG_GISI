import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";
import "./styles/common.css";

const Login = () => {
  const servidorURL = process.env.REACT_APP_SERVER_IP_PORT;;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [codigo, setCodigo] = useState("");
  const [show2FA, setShow2FA] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${servidorURL}/auth/login`, { email, password });
      if (res.data.message === "Código de verificación enviado") {	
        setShow2FA(true);
      } else {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("nombre", res.data.nombre);
        sessionStorage.setItem("id", res.data.id);
        const primerLogin = sessionStorage.getItem("primer_login");
	if (primerLogin === "true") {
  		sessionStorage.removeItem("primer_login");
  		navigate("/cribado");
	} else {
  		navigate("/perfil-usuario");
	}
      }
    } catch (err) {
        setError(err.response?.data|| "Error en el registro");
      }
      
  };

  const handle2FA = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${servidorURL}/auth/verificar-2fa`, { email, codigo });
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("nombre", res.data.nombre);
      sessionStorage.setItem("id", res.data.id);
      const primerLogin = sessionStorage.getItem("primer_login");
      if (primerLogin === "true") {
	      sessionStorage.removeItem("primer_login");
	      navigate("/cribado");
      } else {
	      navigate("/perfil-usuario");
      }
    } catch (err) {
      setError(err.response?.data || "Error en el servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src="/images/login.jpg" alt="Imagen de LogIn" />
      </div>
      <div className="login-form">
        <h2>{show2FA ? "Verificar Código" : "Iniciar sesión"}</h2>
        {!show2FA ? (
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Iniciar sesión</button>
          </form>
        ) : (
          <form onSubmit={handle2FA}>
            <p>Código de verificación enviado a tu correo. Introducelo.</p>
            <input type="text" placeholder="Código de verificación" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
            <button type="submit">Verificar código</button>
          </form>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
