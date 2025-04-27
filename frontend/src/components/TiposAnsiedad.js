import React from "react";
import "../styles/TiposAnsiedad.css";

const TiposAnsiedad = ({ tipos_ansiedad_detectados }) => {

    const tiposAgrupados = tipos_ansiedad_detectados.reduce((accum, tipo) => {
        if(!accum[tipo.nombre]) {
            accum[tipo.nombre] = {informacion: tipo.informacion, fechasDistintas: []};
        } 
        accum[tipo.nombre].fechasDistintas.push(new Date(tipo.fecha).toLocaleDateString());
        return accum;
    }, {});

    return (
        <div className="tipos-ansiedad-container">
            <h2 className="tipos-ansiedad-titulo">
            <span className="material-symbols-outlined">notification_important</span>
                Tipos de Ansiedad Detectados
            </h2>
            <p className="tipos-ansiedad-nota">Aquí puedes encontrar el o los posibles tipos de trastornos de ansiedad para adultos identificados por el chatbot según los criterios del manual DSM-5, con una breve explicación para que comprendas sus síntomas más freceuntes...</p>
            <div className="tipos-ansiedad-lista">
                {Object.keys(tiposAgrupados).length > 0 ? (
                    Object.entries(tiposAgrupados).map(([nombre, { informacion, fechasDistintas }], index) => (
                        <div key={index} className="tipo-ansiedad-item">
                            <h3 className="tipo-ansiedad-nombre">{nombre}</h3>
                            <p className="tipo-ansiedad-informacion">{informacion}</p>
                            <p className="tipo-ansiedad-fecha">Detectado en las siguientes fechas: {fechasDistintas.join(", ")}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-deteccion">
                        Por el momento, el chatbot no ha detectado con probabilidades significativas que puedas tener un tipo específico de los trastornos de ansiedad.
                        No obstante, tienes acceso al resto de las funcionalidades de tu perfil y puedes volver a realizar el proceso de evaluación de ansiedad cuando quieras!
                    </p>
                )}
            </div>
            <p className="tipos-ansiedad-nota">Los resultados proporcionados por el chatbot <strong>NO constituyen un diagnóstico médico</strong>. Son una orientación para ayudarte a comprender mejor tu estado emocional.</p>
        </div>
    );
};

export default TiposAnsiedad;