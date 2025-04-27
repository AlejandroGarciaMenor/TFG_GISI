import React from "react";
import "./styles/AyudaUrgente.css";

const AyudaUrgente = () => {
    return (
        <div className="ayuda-urgente-container">
            <h2>
                <span className="material-symbols-outlined">notification_important</span>
                ¿Necesitas ayuda urgente para combatir tus síntomas de ansiedad?
            </h2>
            <p>Si estás experimentando síntomas graves de ansiedad y sientes que no puedes manejarlos solo, es importante que busques ayuda profesional de inmediato. Aquí tienes algunas opciones que pueden ayudarte:</p>

            <div className="ayuda-bloque">
                <h3>Teléfonos de Emergencia</h3>
                <ul>
                    <li><strong>Emergencias Generales:</strong> 112</li>
                    <li><strong>Línea de Ayuda contra el Suicidio:</strong> 024</li>
                    <li><strong>Cruz Roja:</strong> 900 107 917</li>
                    <li><strong>Teléfono de la Esperanza:</strong> 717 003 717</li>
                </ul>
            </div>

            <div className="ayuda-bloque">
                <h3>Directorios Profesionales</h3>
                <p>Si prefieres buscar un psicólogo o psiquiatra en tu área, puedes utilizar los siguientes recursos:</p>
                <ul>
                    <li><a href="https://www.cop.es/index.php?page=colegios" target="_blank" rel="noopener noreferrer"> Directorio de Psicólogos de España (COP)</a></li>
                    <li><a href="https://www.copmadrid.org/web/ciudadania/encuentra-psicologo-y-psicologa/directorio" target="_blank" rel="noopener noreferrer">Directorio de Psicólogos de Madrid (COP Madrid)</a></li>
                </ul>
            </div>

            <div className="ayuda-enlaces">
                <p>Si necesitas más información o herramientas para manejar tu ansiedad, puedes:</p>
                <ul>
                    <li><a href="./perfil-usuario" className="ayuda-link">Volver a tu perfil para encontrar tips generales</a></li>
                    <li><a href="./chatbot" className="ayuda-link">Hablar con AnxBot para contarle tus síntomas</a></li>
                </ul>
            </div>
        </div>
    );
};

export default AyudaUrgente;