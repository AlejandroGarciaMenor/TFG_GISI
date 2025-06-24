import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";

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
    const servidorURL = process.env.REACT_APP_SERVER_IP_PORT;
    const userId = sessionStorage.getItem("id");
    const token = sessionStorage.getItem("token");
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const [showCribadoModal, setShowCribadoModal] = useState(location.state?.cribadoBajo || false);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const res = await axios.get(`${servidorURL}/user/usuario`, { 
                    params: { userId } ,
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsuario(res.data);
                setCargando(false);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error("Token expirado. Redirigiendo al inicio de sesión...");
                    sessionStorage.clear(); 
                    navigate("/login");
                } else {
                    console.error("Error cargando los datos del usuario:", error);
                }
            }
        };
        fetchUsuario();
    }, [userId, token, navigate]);

    if (cargando) {
        return (
            <p>Cargando...</p>
        );
    }

    return (
        <div className="perfil-usuario-container">
            <Modal
                isOpen={showCribadoModal}
                onRequestClose={() => setShowCribadoModal(false)}
                className="modal"
                overlayClassName="overlay"
            >
                <h2>¡Buen resultado!</h2>
                <p>
                  Tu puntuación en el cribado inicial es muy baja, por lo que no es necesario realizar una evaluación más profunda en este momento.<br/>
                  Puedes consultar tu perfil y usar las herramientas disponibles cuando lo necesites.
                </p>
                <button onClick={() => setShowCribadoModal(false)} className="close-button">Cerrar</button>
            </Modal>
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
