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
    { id: "p1", texto: "¿Sentirse nervioso, ansioso, preocupado o al límite?" },
    { id: "p2", texto: "¿Sentir pánico o estar atemorizado?" },
    { id: "p3", texto: "¿Evitar situaciones que le ponen nervioso?" }
  ];

  const opciones = [
    { texto: "Nada (En ningún momento)", valor: 0 },
    { texto: "Algo (Raro, menos de un día o dos)", valor: 1 },
    { texto: "Leve (Varios días)", valor: 2 },
    { texto: "Moderado (Más de la mitad de los días)", valor: 3 },
    { texto: "Grave (Casi cada día)", valor: 4 }
  ];

  const handleSelect = (valor) => {
    setAnimacion(true); 
    setRespuestas((prev) => ({ ...prev, [preguntas[indicePregunta].id]: valor }));

    setTimeout(() => {
      setAnimacion(false); 
      if (indicePregunta < preguntas.length - 1) {
        setIndicePregunta(indicePregunta + 1);
      } else {
        calcularResultado();
      }
    }, 300);
  };

  const calcularResultado = () => {
    const algunaRespuestaAlta = Object.values(respuestas).some((val) => val >= 2);
    algunaRespuestaAlta ? navigate("/analisis-detallado") : alert("No presentas síntomas preocupantes.");
  };

  return (
    <div className="cribado-container">
      <h1 className="titulo">Hola, {nombre}!</h1>
      <p className="subtitulo">Realizaremos un breve cribado sobre tu estado emocional (Medida de síntomas transversales del DSM-5).</p>
      <p className="subtitulo">Durante las últimas DOS (2) SEMANAS, ¿cuánto (o con qué frecuencia) le han perturbado los siguientes problemas?</p>

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