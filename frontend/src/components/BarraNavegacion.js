import React  from "react";
import "../styles/BarraNavegacion.css";

const BarraNavegacion = () => {
    return (
        <nav className="barra-navegacion">
        <ul>
            <li><a href="#estadisticas-gravedad">Evolución niveles de ansiedad</a></li>
            <li><a href="#tipos-ansiedad">Tipos de ansiedad detectados</a></li>
            <li><a href="#diario-evaluaciones">Diario de evaluaciones</a></li>
            <li><a href="#reto-diario">Reto diario</a></li>
            <li><a href="#minijuego">Minijuego</a></li>
        </ul>
    </nav>
    );
};

export default BarraNavegacion;