import React from "react";

const TiposAnsiedad = ({ tipos_ansiedad_detectados }) => {
    return (
        <div className="tipos-ansiedad-container">
            <h2 className="tipos-ansiedad-titulo">Tipos de Ansiedad Detectados</h2>
            <p className="tipos-ansiedad-nota">
                <strong>Nota:</strong> Los resultados proporcionados por el chatbot <strong>NO constituyen un diagnóstico médico</strong>. Son una orientación para ayudarte a comprender mejor tu estado emocional.
            </p>
            <div className="tipos-ansiedad-lista">
                {tipos_ansiedad_detectados.length > 0 ? (
                    tipos_ansiedad_detectados.map((tipo, index) => (
                        <div key={index} className="tipo-ansiedad-item">
                            <h3 className="tipo-ansiedad-nombre">{tipo.nombre}</h3>
                            <p className="tipo-ansiedad-informacion">{tipo.informacion}</p>
                            <p className="tipo-ansiedad-fecha">Detectado el: {new Date(tipo.fecha).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No se han detectado tipos de ansiedad hasta el momento.</p>
                )}
            </div>
        </div>
    );
};

export default TiposAnsiedad;