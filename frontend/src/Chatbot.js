import React,  { useState } from "react";
import axios from "axios";

const Chatbot = () => {
    const [input, setInput] = useState("");
    const [respuestas, setRespuestas] = useState([
        {tipo: "bot", texto: "Hola, soy Chatbot."}
    ]);

    const enviarMensaje = async () => {
        
        const nuevaRespuesta = {tipo:"usuario", texto: input};
        setRespuestas([...respuestas, nuevaRespuesta]);

        try {
            const response = await axios.post("https://localhost:5000/chatbot", {input});

            const respuestaBot = {tipo: "bot", texto: response.data.respuesta};

            setRespuestas([...respuestas, nuevaRespuesta, respuestaBot]);
        } catch (error) {
            console.error("Error:", error);
        }

        setInput("");
    };

    return(
        <div className="chat-container">
            <div className="chat-box">
                {respuestas.map((mensaje, index) => (
                    <div key={index} className={`mensaje ${mensaje.tipo}`}>
                        <p>{mensaje.texto}</p>
                    </div>
                ))}
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