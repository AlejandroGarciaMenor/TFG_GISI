import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [fechanacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fechaISO = new Date(fechanacimiento).toISOString().split("T")[0];
    try {
      const res = await axios.post("http://localhost:5000/register", { nombre, fechanacimiento: fechaISO, genero, email, password });
      setMensaje(res.data.message);
    } catch (err) {
      setMensaje(err.response?.data || "Error en el registro");
    }
  };

return (
    <div>
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
            <button type="submit">Registrarse</button>
        </form>
        {mensaje && <p>{mensaje}</p>}
    </div>
);
};

export default Register;