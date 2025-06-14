import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Register.css";

const Register = () => {
  const servidorURL = process.env.SERVER_IP_PORT || 'http://localhost:5000';
  const [nombre, setNombre] = useState("");
  const [fechanacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  // función para validar contraseña
  const validarPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$_!%*?&])[A-Za-z\d@$!%*?&_]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fechaISO = new Date(fechanacimiento).toISOString().split("T")[0];

    // verificación de fecha de nacimiento
    const today = new Date();
    const fechanacimiento_verificar = new Date(fechanacimiento);
    let edad = today.getFullYear() - fechanacimiento_verificar.getFullYear();
    const diferenciaMeses = today.getMonth() - fechanacimiento_verificar.getMonth();
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && today.getDate() < fechanacimiento_verificar.getDate())) {
      edad--;
    }
    if (edad < 18) {
      return setMensaje("Debe ser mayor de edad para registrarse");
    }

    // verificación de contraseña
    if (!validarPassword(password)) {
      return setMensaje("La contraseña debe estar formada por al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial");
    }

    try {
      const res = await axios.post(`${servidorURL}/auth/register`, { nombre, fechanacimiento: fechaISO, genero, email, password });
      navigate("/cribado");
      setMensaje(res.data.message);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error en el registro";
      setMensaje(errorMessage);
    }
  };

return (
  <div className="register-container">
    <div className="register-image">
      <img src="/images/registro.jpg" alt="Bienvenido" />
    </div>
    <div className="register-form">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="date" placeholder="Fecha de nacimiento" value={fechanacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />
        <select value={genero} onChange={(e) => setGenero(e.target.value)} required>
          <option value="">Seleccione su género</option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
        </select>
        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div className="checkbox-container">
          <input type="checkbox" required /> 
          <label>He leído y acepto la<a href="/privacidad"> Política de Privacidad</a></label>
        </div>
        <button type="submit">Registrarse</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  </div>
);
};

export default Register;