import React, { useState, useEffect } from "react";
import axios from "axios";

import "./styles/PerfilUsuario.css";
import DatosPerfilUsuario from "./components/DatosPerfilUsuario";
import EstadisticasUsuario from "./components/EstadisticasUsuario";
import DiarioEvaluaciones from "./components/DiarioEvaluaciones";
import AlertaGravedad from "./components/AlertaGravedad";
import ReEvaluacion from "./components/ReEvaluacion";
import RetoDiario from "./components/RetoDiario";
import TiposAnsiedad from "./components/TiposAnsiedad";

const PerfilUsuario = () => {
    const userId = sessionStorage.getItem("id");
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const res = await axios.get("https://localhost:5000/usuario", { 
                    params: { userId } 
                });
                setUsuario(res.data);
                setCargando(false);
            } catch (error) {
                console.error("Error cargando los datos del usuario", error);
            }
        };
        fetchUsuario();
    }, []);

    if (cargando) {
        return (
            <p>Cargando...</p>
        );
    }

    return (
        <div className="perfil-usuario-container">
            <DatosPerfilUsuario usuario={usuario.usuario}/>
            <ReEvaluacion/>
            <EstadisticasUsuario puntuaciones_gravedad={usuario.puntuaciones_gravedad}/>
            <TiposAnsiedad tipos_ansiedad_detectados={usuario.tipos_ansiedad_detectados}/>
            <DiarioEvaluaciones resumenes_chatbot={usuario.resumenes_chatbot}/>
            {usuario.alerta_gravedad_severa && <AlertaGravedad />}
            <RetoDiario userId={userId} tipos_ansiedad_detectados={usuario.tipos_ansiedad_detectados}/>
            <div className="acceso-minijuego-478">
                <h2>Minijuego</h2>
                <p>Te hemos preparado un minijuego de relajación!</p>
                <a href="/minijuego-respiracion" className="acceso-minijuego-478-link">Acceso al minijuego de respiración 478</a>
            </div>
        </div>
    );
}

export default PerfilUsuario;
