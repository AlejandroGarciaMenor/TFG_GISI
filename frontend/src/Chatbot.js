import React,  { useState } from "react";

const Chatbot = () => {
    const [input, setInput] = useState("");

    const enviarMensaje = () => {

    };

    return(
        <div className="chat-container">
            <div className="chat-box">
                <div className="mensaje">
                    Texo chatbot
                </div>
            </div>
            <div className="input-box">
                <input
                    type="text"
                    value="mensaje"
                    placeholder="Escribe un mensaje..."
                />
                <button onClick={enviarMensaje}>Enviar</button>
            </div>
        </div>
    );
};

export default Chatbot;