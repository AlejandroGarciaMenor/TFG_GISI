import React from "react";
import "../styles/DiarioEvaluaciones.css";

const DiarioEvaluaciones = ({ resumenes_chatbot }) => {
    return (
        <div className="diario-evaluaciones-container">
            <h3>
                <span className="material-symbols-outlined">diagnosis</span>
                Diario de Evaluaciones
            </h3>
            <p className="diario-evaluaciones-descripcion">
                Te hemos preparado un resumen de tus conversaciones con VITA:
            </p>
            {resumenes_chatbot.length > 0 ? (
                <ul>
                    {resumenes_chatbot.map((resumen_chatbot, index) => (
                        <li key={index}>
                            <strong>{new Date(resumen_chatbot.fecha).toLocaleDateString()}</strong>: {resumen_chatbot.resumen}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay evaluaciones disponibles.</p>
            )}
        </div>
    );
}

export default DiarioEvaluaciones;