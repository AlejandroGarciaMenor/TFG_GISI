import React,  { useState } from "react";
import axios from "axios";

const Chatbot = () => {
    const [input, setInput] = useState("");
    const [respuestas, setRespuestas] = useState([]);

    const enviarMensaje = async () => {
        
        const nuevaRespuesta = {texto: input};
        setRespuestas([...respuestas, nuevaRespuesta]);

        try {
            const response = await axios.post("https://localhost:5000/chatbot", {input});

            const respuestaBot = {texto: response.data.respuesta};

            setRespuestas([...respuestas, nuevaRespuesta, respuestaBot]);
        } catch (error) {
            console.error("Error:", error);
        }

        setInput("");
    };

    return(
        <div className="chat-container">
            <div className="chat-box">
                <div className="mensaje">
                    {respuestas.map((mensaje) => (
                        <p>{mensaje.texto}</p>
                    ))}
                </div>
            </div>
            <div className="input-box">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe un mensaje..."
                />
                <button onClick={enviarMensaje}>Enviar</button>
            </div>
        </div>
    );
};

export default Chatbot;