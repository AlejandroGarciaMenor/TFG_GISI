import React from "react";
import "../styles/ReEvaluacion.css";

const ReEvaluacion = () => {
    return (
        <div className="re-evaluacion-container">
            <h2 className="re-evaluacion-titulo">
                <span className="material-symbols-outlined">repeat</span>
                Inicia un nuevo proceso de evaluación de ansiedad
            </h2>
            <p className="re-evaluacion-descripcion">
                Puedes volver a realizar el proceso de evaluación desde los cuestionarios para conocer tu evolución y tu estado actual de ansiedad. También podrás hablar con el chatbot VITA para contarle tu situación actual. VITA tratará de detectar si puedes tener algún tipo de trastorno de ansiedad de adultos según los criterios del DSM-5, te genererá un resumen de tu situación y le puedes pedir también consejos. Recuerda:
            </p>
            <ul className="re-evaluacion-recordatorios"> 
                <li className="re-evaluacion-recordatorio">Los resultados proporcionados por el chatbot NO constituyen un diagnóstico médico.</li>
                <li className="re-evaluacion-recordatorio">Siempre puedes consultar a un profesional, sobre todo en el caso de que la ansiedad no sea manejable. Puedes consultar más información <a href="./ayuda-urgente" target="__blank">aquí</a></li>
            </ul>
            <button className="boton-reevaluacion" onClick={() => window.location.href = "/cribado"}>
                Quiero hacer los cuestionarios y hablar con VITA
            </button>
        </div>
    );
}

export default ReEvaluacion;