import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Cribado.css";
import "./styles/common.css";

const Cribado = () => {
  const navigate = useNavigate();
  const nombre = sessionStorage.getItem("nombre");
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [animacion, setAnimacion] = useState(false);

  const preguntas = [
    { id: "p1", texto: "¿Te has sentido nervioso, ansioso o preocupado?" },
    { id: "p2", texto: "¿Has experimentado pánico o miedo intenso?" },
    { id: "p3", texto: "¿Evitas situaciones que te generan ansiedad?" }
  ];

  const opciones = [
    { texto: "Nada (Nunca)", valor: 0 },
    { texto: "Algo (Ocasionalmente)", valor: 1 },
    { texto: "Leve (Algunos días)", valor: 2 },
    { texto: "Moderado (Frecuente)", valor: 3 },
    { texto: "Grave (Casi todos los días)", valor: 4 }
  ];

  const handleSelect = (valor) => {
    setAnimacion(true); // Activamos la animación de salida
    setRespuestas((prev) => ({ ...prev, [preguntas[indicePregunta].id]: valor }));

    setTimeout(() => {
      setAnimacion(false); // Quitamos animación de salida
      if (indicePregunta < preguntas.length - 1) {
        setIndicePregunta(indicePregunta + 1);
      } else {
        calcularResultado();
      }
    }, 300); // Tiempo para la transición CSS
  };

  const calcularResultado = () => {
    const total = Object.values(respuestas).reduce((acc, val) => acc + val, 0);
    total >= 6 ? navigate("/analisis-detallado") : alert("No presentas síntomas preocupantes.");
  };

  return (
    <div className="cribado-container">
      <h1 className="titulo">Bienvenido, {nombre}!</h1>
      <p className="subtitulo">Realizaremos un breve cribado sobre tu estado emocional.</p>

      <div className={`pregunta-card ${animacion ? "salida" : "entrada"}`}>
        <h2>{preguntas[indicePregunta].texto}</h2>
        {opciones.map((opcion, index) => (
          <button key={index} className="boton-opcion" onClick={() => handleSelect(opcion.valor)}>
            {opcion.texto}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Cribado;