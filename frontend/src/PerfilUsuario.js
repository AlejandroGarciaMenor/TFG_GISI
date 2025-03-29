import React from "react";
import { useNavigate } from "react-router-dom";

import "./styles/PerfilUsuario.css";


const PerfilUsuario = () => {
    const navigate = useNavigate();
    const userId = sessionStorage.getItem("id");
    const nombre = sessionStorage.getItem("nombre");
    const fotoPerfil = sessionStorage.getItem("fotoPerfil") || "../images/default-user.png";
    const fotoGravedad = "../images/gravedad.jpg";
    const fotoCribado = "../images/cribado.jpg";
    const fotoChatbot = "../images/chatbot.jpg";

    const irACribado = () => navigate("/cribado");
    const irAGravedad = () => navigate("/gravedad");
    const irAChatbot = () => navigate("/chatbot");
    const irARecomendaciones = () => navigate("/recomendaciones");

    return (
        <div className="perfil-usuario-container">
            <div className="cabecera-usuario">
                <img src={fotoPerfil.startsWith("./") ? require(`${fotoPerfil}`) : fotoPerfil} alt="Foto de perfil" />
                <div className="datos-usuario">
                    <h3>{nombre}</h3>
                </div>
            </div>
            <div className="modulos-cuestionarios">
                <div className="modulo" onClick={irACribado} style={{ backgroundImage: `url(${fotoCribado})`}}>
                    <div className="modulo-contenido">
                        <h2>Cribado</h2>
                        <p>Vuelve a acceder a las preguntas del cribado de ansiedad.</p>
                    </div>
                </div>
                <div className="modulo" onClick={irAGravedad} style={{ backgroundImage: `url(${fotoGravedad})`}}>
                    <div className="modulo-contenido">
                        <h2>Cuestionario de Gravedad</h2>
                        <p>Rehaz el cuestionario PROMIS para conocer el estado de tus síntomas.</p>
                    </div>
                </div>
            </div>
            <div className="modulo-chatbot">
                <div className="modulo" onClick={irAChatbot} style={{ backgroundImage: `url(${fotoChatbot})`}}>
                    <div className="modulo-contenido">
                        <h2>Chatbot</h2>
                        <p>Chatea con nuestro chatbot para recibir ayuda.</p>
                    </div>
                </div>
            </div>
            <div className="modulo-recomendaciones">
                <div className="modulo" onClick={irARecomendaciones} style={{ backgroundImage: `url(${fotoCribado})`}}>
                    <div className="modulo-contenido">
                        <h2>Recomendaciones</h2>
                        <p>Accede a las recomendaciones que te hemos preparado.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PerfilUsuario;
