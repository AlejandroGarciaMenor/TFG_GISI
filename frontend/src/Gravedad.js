import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/PaginaCuestionario.css";

const Gravedad = () => {
  const servidorURL = process.env.SERVER_IP_PORT || 'http://localhost:5000';
  const navigate = useNavigate();
  const nombre = sessionStorage.getItem("nombre");
  const userId = sessionStorage.getItem("id");
  const token = sessionStorage.getItem("token");
  const [indicePreguntaGravedad, setIndicePreguntaGravedad] = useState(0);
  const [respuestasGravedad, setRespuestasGravedad] = useState({});
  const [animacion, setAnimacion] = useState(false);

  const preguntasGravedad = [
    { id: 1, texto: "Sentí miedo" },
    { id: 2, texto: "Sentí ansiedad" },
    { id: 3, texto: "Me sentí preocupado/a" },
    { id: 4, texto: "Tuve dificultad para concentrarme en otra cosa que no fuera mi ansiedad" },
    { id: 5, texto: "Me sentí nervioso/a" },
    { id: 6, texto: "Me sentí intranquilo/a" },
    { id: 7, texto: "Me sentí tenso/a" }
  ];

  const opcionesGravedad = [
    { texto: "Nunca", valor: 1 },
    { texto: "Rara vez", valor: 2 },
    { texto: "Algunas veces", valor: 3 },
    { texto: "A menudo", valor: 4 },
    { texto: "Siempre", valor: 5 },
    { texto: "No lo sé / Prefiero no contestar", valor: 0 }
  ];

  // funcion para manejar la seleccion de una opcion
  const handleSelect = (valor) => {
    const preguntaId = preguntasGravedad[indicePreguntaGravedad].id;
    const nuevasRespuestasGravedad = { ...respuestasGravedad, [preguntaId]: valor };
    setRespuestasGravedad(nuevasRespuestasGravedad);

    if (indicePreguntaGravedad === preguntasGravedad.length - 1) { 
      setTimeout(() => {
        evaluarRespuestas(nuevasRespuestasGravedad);
      }, 300);
    } else { 
      setTimeout(() => {
        setIndicePreguntaGravedad((prev) => prev + 1);
      }, 300);
    }

    setAnimacion(true);
    setTimeout(() => setAnimacion(false), 300);
  };

  const evaluarRespuestas = (respuestasFinales) => {
    const sumaRespuestas = Object.values(respuestasFinales).reduce((a, b) => a + b, 0);
    const totalRespuestas = Object.values(respuestasFinales).filter(valor => valor !== 0).length;
    const totalPreguntas = preguntasGravedad.length;

    const puntuacion_gravedad = Math.round((sumaRespuestas * totalPreguntas) / totalRespuestas);
    if (totalRespuestas <= 5) {
      navigate("/chatbot");
    } else if (puntuacion_gravedad <= 15 || puntuacion_gravedad >= 28) {
      guardarRespuestas(puntuacion_gravedad);
      navigate("/perfil-usuario");
    } else{
      guardarRespuestas(puntuacion_gravedad);
      navigate("/chatbot");
    }
  }

  // guardo las respuestas en la base de datos
  const guardarRespuestas = async (puntuacion_gravedad) => {
    try {
      await axios.post( `${servidorURL}/cuestionarios/guardar-gravedad`, 
        {user_id: userId, puntuacion_gravedad},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Error al guardar las respuestas:", err);
      alert("Error al guardar las respuestas");
    }
  };

  return (
    <div className="cuestionario-container">
      <h1 className="titulo">Hola, {nombre}!</h1>
      <p className="descripcion">
          Ahora vamos a evaluar tu nivel de ansiedad, a través del cuestionario
          <a href="https://www.promishealth.org/" target="__blank">PROMIS® Emotional Distress - Anxiety – Short Form 7a. </a>
          Este cuestionario sirve para evaluar el nivel de ansiedad de un adulto en los últimos 7 días y hacer un seguimiento de su evolución.
          Si faltan más del 25% de las respuestas, el resultado no es válido. Podrás encontrar tus resultados en la sección de estadísticas de tu perfil.
      </p>
      <p className="descripcion">
        Por favor, selecciona la opción que mejor describa tu <strong>experiencia en los últimos 7 días.</strong>
      </p>
      <div className={`pregunta-card ${animacion ? "salida" : "entrada"}`}>
        <h2 className="pregunta-texto">{preguntasGravedad[indicePreguntaGravedad].texto}</h2>
        {opcionesGravedad.map((opcion, index) => (
          <button key={index} className={`boton-opcion opcion-${opcion.valor-1}`} onClick={() => handleSelect(opcion.valor)}>
            {opcion.texto}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gravedad;