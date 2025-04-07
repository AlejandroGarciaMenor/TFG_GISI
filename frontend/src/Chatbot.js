import React, { useState } from 'react';
import axios from 'axios';
import "./styles/Chatbot.css";

const Chatbot = () => {
  const userId = sessionStorage.getItem("id");
  const imagenUsuario = sessionStorage.getItem("fotoPerfil") || "./images/default-user.png";
  const imagenBot = "./images/chatbot.jpg";
  const [mensaje, setMensaje] = useState('');
  const [historial, setHistorial] = useState([]);

  const handleEnviar = async () => {
    if (!mensaje.trim()) return;
    try {
      const response = await axios.post('https://localhost:5000/chatbot', { 
        input: mensaje,
        user_id: userId
      });
      setHistorial([...historial, { quien: 'usuario', texto: mensaje }, { quien: 'bot', texto: response.data.respuesta }]);
      setMensaje('');
    } catch (error) {
      console.error('Error al enviar el mensaje al backend:', error);
    }
  };

  return (
    <div className='chatbot-container'>
      <div className='chatbot-header'>
        <h2>¡Bienvenido a AnxBot!</h2>
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
          placeholder="Escribe un mensaje..." 
        />
        <button onClick={handleEnviar}>Enviar</button>
      </div>
    </div>
  );
};

export default Chatbot;