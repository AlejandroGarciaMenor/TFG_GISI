import React from "react";

const DiarioEvaluaciones = ({ resumenes_chatbot }) => {
    return (
        <div className="diario-evaluaciones">
            <h3>Diario de Evaluaciones</h3>
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