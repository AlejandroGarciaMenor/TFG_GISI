import React, { useState } from "react";
import axios from "axios";
import "../styles/DatosPerfilUsuario.css";

const BloqueDatosUsuario = ({ usuario }) => {
    const [editando, setEditando] = useState(false);
    const [datosFormulario, setdatosFormulario] = useState({
        user_id: sessionStorage.getItem("id"),
        nombre: usuario.nombre,
        email: usuario.email,
        fechanacimiento: usuario.fechanacimiento,
        genero: usuario.genero,
    });
    const [mensaje, setMensaje] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdatosFormulario({ ...datosFormulario, [name]: value });
    }

    const handleGuardar = async () => {

        // verificación de fecha de nacimiento
        const today = new Date();
        const fechanacimiento_verificar = new Date(datosFormulario.fechanacimiento);
        let edad = today.getFullYear() - fechanacimiento_verificar.getFullYear();
        const diferenciaMeses = today.getMonth() - fechanacimiento_verificar.getMonth();
        if (diferenciaMeses < 0 || (diferenciaMeses === 0 && today.getDate() < fechanacimiento_verificar.getDate())) {
        edad--;
        }
        if (edad < 18) {
            return setMensaje("No puedes editar tu perfil si eres menor de edad");
        }

        const datosFormularioConFechaISO= {
            ...datosFormulario,
            fechanacimiento: new Date(datosFormulario.fechanacimiento).toISOString().split("T")[0],
        };

        try {
            await axios.put("https://localhost:5000/usuario", datosFormularioConFechaISO);
            setEditando(false);
        } catch (error) {
            console.error("Error actualizando los datos del usuario", error);
        }
    };

    return (
        <div className="datos-perfil-usuario">
            <img 
                src={usuario.fotoPerfil || "./images/default-user.png"} 
                alt="Foto de perfil" 
                className="perfil-imagen" 
            />
            <div className="perfil-info">
                {editando ? (
                    <form>
                        <label>Nombre: <input type="text" name="nombre" value={datosFormulario.nombre} onChange={handleChange} /></label>
                        <label>Email: <input type="email" name="email" value={datosFormulario.email} onChange={handleChange} /></label>
                        <label>Fecha de nacimiento: <input type="date" name="fechanacimiento" value={datosFormulario.fechanacimiento} onChange={handleChange} /></label>
                        <label>Género: 
                            <select name="genero" value={datosFormulario.genero} onChange={handleChange}>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                        </label>
                        <button className="boton-editar" type="button" onClick={handleGuardar}>Guardar</button>
                        <button className="boton-cancelar" type="button" onClick={() => setEditando(false)}>Cancelar</button>
                    </form>
                ) : (
                    <>
                    <h2>{usuario.nombre}</h2>
                    <p>Email: {usuario.email}</p>
                    <p>Fecha de nacimiento: {new Date(usuario.fechanacimiento).toLocaleDateString()}</p>
                    <p>Género: {usuario.genero}</p>
                    <button className="boton-editar" onClick={() => setEditando(true)}>Editar</button>
                    </>
                )}
                {mensaje && <p className="mensaje-error">{mensaje}</p>}
            </div>
        </div>
    );
};

export default BloqueDatosUsuario;