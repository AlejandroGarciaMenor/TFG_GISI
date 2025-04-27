import React, { useState, useEffect } from "react";
import axios from "axios";

import "./styles/PerfilUsuario.css";
import BarraNavegacion from "./components/BarraNavegacion";
import DatosPerfilUsuario from "./components/DatosPerfilUsuario";
import EstadisticasUsuario from "./components/EstadisticasUsuario";
import DiarioEvaluaciones from "./components/DiarioEvaluaciones";
import AlertaGravedad from "./components/AlertaGravedad";
import ReEvaluacion from "./components/ReEvaluacion";
import RetoDiario from "./components/RetoDiario";
import TiposAnsiedad from "./components/TiposAnsiedad";
import MinijuegoRespiracion478 from "./MinijuegoRespiracion478";

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
            <div className="perfil-usuario-header">
                <DatosPerfilUsuario usuario={usuario.usuario}/>
                <BarraNavegacion/>
            </div>
            {usuario.alerta_gravedad_severa && <AlertaGravedad />}
            <section id="re-evaluacion" className="seccion-re-evaluacion">
                <ReEvaluacion/>
            </section>
            <section id="estadisticas-gravedad" className="seccion-estadisticas-gravedad">
                <EstadisticasUsuario puntuaciones_gravedad={usuario.puntuaciones_gravedad}/>
            </section>
            <section id="tipos-ansiedad" className="seccion-tipos-ansiedad">
                <TiposAnsiedad tipos_ansiedad_detectados={usuario.tipos_ansiedad_detectados}/>
            </section>
            <section id="diario-evaluaciones" className="seccion-diario-evaluaciones">
                <DiarioEvaluaciones resumenes_chatbot={usuario.resumenes_chatbot}/>
            </section>
            <section className="seccion-reto-minijuego">
                <section id="reto-diario" className="seccion-reto-diario">
                    <RetoDiario userId={userId} tipos_ansiedad_detectados={usuario.tipos_ansiedad_detectados}/>
                </section>
                <section id="minijuego" className="seccion-acceso-minijuego">
                    <MinijuegoRespiracion478/>
                </section>
            </section>
        </div>
    );
}

export default PerfilUsuario;
