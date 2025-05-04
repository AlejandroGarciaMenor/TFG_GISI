import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import "./styles/Chatbot.css";

Modal.setAppElement('#root');

const Chatbot = () => {
  const userId = sessionStorage.getItem("id");
  const nombreUsuario = sessionStorage.getItem("nombre");
  const token = sessionStorage.getItem("token");
  const imagenUsuario = sessionStorage.getItem("fotoPerfil") ? `https://localhost:5000${sessionStorage.getItem("fotoPerfil")}` : "./images/default-user.png";
  const imagenBot = "./images/chatbot.jpg";
  const [mensaje, setMensaje] = useState('');
  const [historial, setHistorial] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleEnviar = async () => {
    if (!mensaje.trim()) return;
    try {
      const response = await axios.post('http://localhost:5000/chatbot/chatbot-conversacion', 
        { input: mensaje, user_id: userId},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setHistorial([...historial, { quien: 'usuario', texto: mensaje }, { quien: 'bot', texto: response.data.respuesta }]);

      if(response.data.tipos_ansiedad && response.data.tipos_ansiedad.length > 0) {
        const tipos = response.data.tipos_ansiedad.join(', ');
        setTimeout(() => {
          setModalIsOpen(true);
        }, 3000);
      }

      setMensaje('');
    } catch (error) {
      console.error('Error al enviar el mensaje al backend:', error);
    }
  };

  const handleIrPerfil = async () => {
    try {
      await axios.post('http://localhost:5000/chatbot/guardar-resumen', 
        { user_id: userId, historial},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Error al guardar el resumen:', error);
    }
  };

  return (
    <div className='chatbot-container'>
      <div className='chatbot-header'>
        <h2>¡Bienvenido a VITA!</h2>
        <p>¿Que tal estás {nombreUsuario} ?  Cuéntame todos los síntomas que tengas relacionados con tu ansiedad!</p>
      </div>
      <div className='chatbot-historial'>
        {historial.map((msg, idx) => (
          <div key={idx} className={`mensaje ${msg.quien}`}>
            {msg.quien === 'bot' && <img src={imagenBot} alt="Chatbot" />}
            <div className="mensaje-texto">{msg.texto}</div>
            {msg.quien === 'usuario' && <img src={imagenUsuario} alt="Usuario" />}
          </div>
        ))}
      </div>
      <div className='chatbot-input'>
        <input 
          type="text" 
          value={mensaje} 
          onChange={(e) => setMensaje(e.target.value)}
          onKeyDown={(e => e.key === "Enter" ? handleEnviar() : null)} 
          placeholder="Escribe un mensaje..." 
        />
        <button onClick={handleEnviar}>Enviar</button>
      </div>

      {historial.length >= 10 && (
        <div className="perfil-link-container">
          <p>
            Aunque por el momento AnxBot no ha conseguido clasificar ningún tipo de trastorno de ansiedad, hemos ido recopilando tus síntomas.
            <br />
            <br />
            Puedes seguir conversando con AnxBot e incluso pedirle algunas recomendaciones, pero si quieres puedes visitar tu perfil de usuario
            para ver un resumen de tus síntomas y encontrar herramientas que te ayuden a combatir la ansiedad:
            <br />
          </p>
          <a href='./perfil-usuario' className='perfil-link' onClick={handleIrPerfil}>Ir a mi perfil</a>    
        </div>
      )}
      
      {}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Parece que AnxBot ha detectado que puedes tener un tipo de ansiedad.</h2>
        <p>Recuerda que <strong>NO SE TRATA DE UN DIAGNÓSTICO MÉDICO</strong>, simplemente es una ORIENTACIÓN.</p>  
        <p>¡Te aconsejamos que visites tu perfil de usuario para encontrar herramientas que te ayuden a combatir la ansiedad!</p>
        <a href="./perfil-usuario" className="perfil-link" onClick={handleIrPerfil}>Ir a mi perfil</a>
        <button onClick={() => setModalIsOpen(false)} className="close-button">Cerrar</button>
      </Modal>

    </div>
  );
};

export default Chatbot;