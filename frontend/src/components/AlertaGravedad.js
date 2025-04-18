import React, {useState} from "react";
import Modal from "react-modal";

Modal.setAppElement('#root');

const AlertaGravedad = () => {

    const [modalIsOpen, setModalIsOpen] = useState(true);

    return (
        <div className="alerta-gravedad-container">
            {}
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            className="modal-gravedad"
            overlayClassName="overlay-gravedad"
            >
                <h2>Hemos detectado un <strong>nivel de ansiedad severo</strong> según tu última autoevaluación con el cuestionario PROMIS.</h2>
                <p>Esto significa que en los últimos días has experimentado síntomas intensos de ansiedad como preocupación constante, tensión física, sensación de peligro inminente o dificultad para relajarte. La puntuación obtenida está en el rango <strong>considerado clínicamente como ansiedad severa</strong>.</p>
                <p>En tu perfil, te hemos preparado algunos tips generales y minijuegos para combatir la ansiedad.</p>
                <p>No obstante, es necesario que <strong>pidas ayuda a un profesional</strong> de la salud mental.</p>
                <a href="./ayuda-urgente" className="link-ayuda" target="blank">¿Cómo puedo pedir ayuda?</a>
                <button className="cerrar-modal" onClick={() => setModalIsOpen(false)}>Continuar en mi perfil</button>
            </Modal>
        </div>
    );
}

export default AlertaGravedad;