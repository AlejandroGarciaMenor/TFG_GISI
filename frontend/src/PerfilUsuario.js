import React, { useState, useEffect } from "react";
import axios from "axios";

import "./styles/PerfilUsuario.css";
import DatosPerfilUsuario from "./components/DatosPerfilUsuario";
import EstadisticasUsuario from "./components/EstadisticasUsuario";
import DiarioEvaluaciones from "./components/DiarioEvaluaciones";

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
            <EstadisticasUsuario puntuaciones_gravedad={usuario.puntuaciones_gravedad}/>
            <DiarioEvaluaciones resumenes_chatbot={usuario.resumenes_chatbot}/>
        </div>
    );
}

export default PerfilUsuario;
