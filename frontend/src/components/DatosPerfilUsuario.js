import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/DatosPerfilUsuario.css";

const BloqueDatosUsuario = ({ usuario }) => {
    const servidorURL = process.env.REACT_APP_SERVER_IP_PORT;
    const token = sessionStorage.getItem("token");
    const [editando, setEditando] = useState(false);
    const [datosFormulario, setdatosFormulario] = useState({
        user_id: sessionStorage.getItem("id"),
        nombre: usuario.nombre,
        email: usuario.email,
        fechanacimiento: usuario.fechanacimiento,
        genero: usuario.genero,
    });
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        if (usuario.foto_perfil) {
            sessionStorage.setItem("fotoPerfil", usuario.foto_perfil);
        }
    }, [usuario.foto_perfil]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdatosFormulario({ ...datosFormulario, [name]: value });
    }

    const handleFotoPerfilChange = (e) => {
        setFotoPerfil(e.target.files[0]);
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

        const datosForm = new FormData();
        datosForm.append("user_id", datosFormulario.user_id);
        datosForm.append("nombre", datosFormulario.nombre);
        datosForm.append("email", datosFormulario.email);
        datosForm.append("fechanacimiento", new Date(datosFormulario.fechanacimiento).toISOString().split("T")[0]);
        datosForm.append("genero", datosFormulario.genero);
        if (fotoPerfil) {
            datosForm.append("fotoPerfil", fotoPerfil);
        }

        try {
            const response = await axios.put(`${servidorURL}/user/usuario`, 
                datosForm,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if(response.data.fotoPerfil){    
                sessionStorage.setItem("fotoPerfil", response.data.fotoPerfil);
            }
            setEditando(false);
        } catch (error) {
            console.error("Error actualizando los datos del usuario", error);
        }
    };

    return (
        <div className="datos-perfil-usuario">
            <img 
                src={usuario.foto_perfil ? `https://tfg-app.xyz:5000${usuario.foto_perfil}` : "./images/default-user.png"} 
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
                        <label>Foto de perfil: <input type="file" name="fotoPerfil" onChange={handleFotoPerfilChange} /></label>
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