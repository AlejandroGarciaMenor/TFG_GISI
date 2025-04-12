import react from "react";

import "./styles/PoliticaPrivacidad.css";

const PoliticaPrivacidad = () => {
    return (
        <div className="politica-privacidad-container">
            <h1>Política de Privacidad</h1>
            <p>Última actualización: Abril 2025</p>
            <h3>1. ¿Qué datos recogemos?</h3>
            <p>Al registrarte o usar AnxBot, podemos recoger los siguientes datos:</p>
            <ul>
                <li>Datos personales, como el nombre, el género y la fecha de nacimiento.</li>
                <li>Respuestas a cuestionarios de cribado y gravedad de la ansiedad.</li>
                <li>Identificación del posible tipo de trastorno de ansiedad por parte del chatbot</li>
            </ul>
            <h3>2. ¿Para qué usamos tus datos?</h3>
            <p>Utilizamos tus datos para:</p>
            <ul>
                <li>Ofrecerte una experiencia personalizada y relevante.</li>
                <li>Analizar tu evolución emocional y darte recomendaciones adaptadas.</li>
                <li>Mejorar el funcionamiento de AnxBot y resolver errores técnicos.</li>
            </ul>
            <h3>3. ¿Cómo tratamos tus datos?</h3>
            <p>Los datos se procesan y almacenan en servidores seguros bajo nuestra responsabilidad. Algunas interacciones del chatbot se procesan a través de la API de OpenAI, que no guarda, entrena ni reutiliza los datos personales, cumpliendo con su política de privacidad: <a href="https://openai.com/policies/privacy-policy/" target="_blank" rel="noopener noreferrer">https://openai.com/policies/privacy-policy/</a>.</p>
            <h3>4. ¿Cuánto tiempo guardamos tus datos?</h3>
            <p>Los datos se conservan mientras tengas una cuenta activa en AnxBot. Puedes solicitar la eliminación de tus datos en cualquier momento.</p>
            <h3>5. ¿Cuáles son tus derechos?</h3>
            <p>Tienes derecho a:</p>
            <ul>
                <li>Acceder a tus datos personales.</li>
                <li>Rectificar datos inexactos o incompletos.</li>
                <li>Solicitar la eliminación de tus datos.</li>
                <li>Oponerte al tratamiento de tus datos.</li>
            </ul>
            <p>Para ejercer estos derechos puedes escribir a: <a href="mailto:alejandro.garciamenor@usp.ceu.es">alejandro.garciamenor@usp.ceu.es</a></p>
            <h3>6. Responsable del tratamiento</h3>
            <p>Este proyecto está desarrollado por Alejandro García Menor. Para cualquier consulta sobre privacidad, puedes contactar a través del correo anterior.</p>
        </div>
    );
};

export default PoliticaPrivacidad;