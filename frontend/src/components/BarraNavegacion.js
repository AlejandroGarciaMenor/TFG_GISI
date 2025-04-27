import React  from "react";
import "../styles/BarraNavegacion.css";

const BarraNavegacion = () => {
    return (
        <nav className="barra-navegacion">
        <ul>
            <li><a href="#estadisticas-gravedad">
                <span className="material-symbols-outlined">monitor_heart</span>
                Evolución niveles de ansiedad
            </a></li>
            <li><a href="#tipos-ansiedad">
                <span className="material-symbols-outlined">notification_important</span>
                Tipos de ansiedad detectados
            </a></li>
            <li><a href="#diario-evaluaciones">
                <span className="material-symbols-outlined">diagnosis</span>
                Diario de evaluaciones
            </a></li>
            <li><a href="#reto-diario">
                <span className="material-symbols-outlined">target</span>
                Reto diario
            </a></li>
            <li><a href="#minijuego">
                <span className="material-symbols-outlined">joystick</span>
                Minijuego
            </a></li>
        </ul>
    </nav>
    );
};

export default BarraNavegacion;