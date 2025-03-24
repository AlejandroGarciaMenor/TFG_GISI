import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Gravedad.css";
import "./styles/common.css";

const Gravedad = ({ idSesion }) => {
  const navigate = useNavigate();
  const nombre = sessionStorage.getItem("nombre");
  const [indicePreguntaGravedad, setIndicePreguntaGravedad] = useState(0);
  const [respuestasGravedad, setRespuestasGravedad] = useState({});
  const [animacion, setAnimacion] = useState(false);

  const preguntasGravedad = [
    { id: 4, texto: "Sentí miedo" },
    { id: 5, texto: "Sentí ansiedad" },
    { id: 6, texto: "Me sentí preocupado/a" },
    { id: 7, texto: "Tuve dificultad para concentrarme en otra cosa que no fuera mi ansiedad" },
    { id: 8, texto: "Me sentí nervioso/a" },
    { id: 9, texto: "Me sentí intranquilo/a" },
    { id: 10, texto: "Me sentí tenso/a" }
  ];

  const opcionesGravedad = [
    { texto: "Nunca", valor: 1 },
    { texto: "Rara vez", valor: 2 },
    { texto: "Algunas veces", valor: 3 },
    { texto: "A menudo", valor: 4 },
    { texto: "Siempre", valor: 5 }
  ];

  // funcion para manejar la seleccion de una opcion
  const handleSelect = (valor) => {
    const preguntaId = preguntasGravedad[indicePreguntaGravedad].id;
    const nuevasRespuestasGravedad = { ...respuestasGravedad, [preguntaId]: valor };
    setRespuestasGravedad(nuevasRespuestasGravedad);

    if (indicePreguntaGravedad === preguntasGravedad.length - 1) { 
      setTimeout(() => {
        guardarRespuestas(nuevasRespuestasGravedad);
      }, 300);
    } else { 
      setTimeout(() => {
        setIndicePreguntaGravedad((prev) => prev + 1);
      }, 300);
    }

    setAnimacion(true);
    setTimeout(() => setAnimacion(false), 300);
  };

  // guardo las respuestas en la base de datos
  const guardarRespuestas = async (respuestasFinales) => {
    try {
      const sumaGravedad = Object.values(respuestasFinales).reduce((a, b) => a + b, 0);
      await axios.post("https://localhost:5000/guardar-gravedad", {

      });
      navigate("/chatbot");
    } catch (err) {
      console.error("Error al guardar las respuestas:", err);
      alert("Error al guardar las respuestas");
    }
  };

  return (
    <div className="gravedad-container">
      <h1 className="titulo">Hola, {nombre}!</h1>
      <p className="subtitulo">Este segundo cuestionario breve nos ayudará a determinar la gravedad de los síntomas.</p>
      <p className="subtitulo">En los últimos 7 días... </p>

      <div className={`pregunta-card ${animacion ? "salida" : "entrada"}`}>
        <h2>{preguntasGravedad[indicePreguntaGravedad].texto}</h2>
        {opcionesGravedad.map((opcion, index) => (
          <button key={index} className="boton-opcion" onClick={() => handleSelect(opcion.valor)}>
            {opcion.texto}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gravedad;