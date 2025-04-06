import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const userId = sessionStorage.getItem("id");
  const [mensaje, setMensaje] = useState('');
  const [historial, setHistorial] = useState([]);

  const handleEnviar = async () => {
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
    <div>
      <div>
        {historial.map((msg, idx) => (
          <p key={idx}><strong>{msg.quien}:</strong> {msg.texto}</p>
        ))}
      </div>
      <input 
        type="text" 
        value={mensaje} 
        onChange={(e) => setMensaje(e.target.value)} 
        placeholder="Escribe un mensaje..." 
      />
      <button onClick={handleEnviar}>Enviar</button>
    </div>
  );
};

export default Chatbot;