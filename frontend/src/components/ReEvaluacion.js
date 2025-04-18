import React from "react";

const ReEvaluacion = () => {
    return (
        <div className="re-evaluacion-container">
            <p>Puedes volver a realizar el proceso de evaluación desde los cuestionarios para conocer tu evolución y tu estado actual de ansiedad</p>
            <button className="boton-reevaluacion" onClick={() => window.location.href = "/cribado"}>Quiero volver a realizar el proceso</button>
        </div>
    );
}

export default ReEvaluacion;