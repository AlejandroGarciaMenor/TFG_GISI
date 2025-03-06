import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Cribado.css";
import "./styles/common.css";

const Cribado = () => {
  const navigate = useNavigate();
  const nombre = sessionStorage.getItem("nombre");
  const userId = sessionStorage.getItem("id");
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [animacion, setAnimacion] = useState(false);
  const [idSesion, setIdSesion] = useState(null);

  // creo una sesion de cribado
  useEffect(() => {
    const iniciarSesionCribado = async () => {
      try {
        const res = await axios.post("http://localhost:5000/iniciar-sesion-cribado", { userId });
        setIdSesion(res.data.idSesion);
      } catch (err) {
        console.error("Error al iniciar la sesión de cribado:", err);
      }
    };
    iniciarSesionCribado();
  }, [userId]);

  const preguntas = [
    { id: 1, texto: "¿Sentirse nervioso, ansioso, preocupado o al límite?" },
    { id: 2, texto: "¿Sentir pánico o estar atemorizado?" },
    { id: 3, texto: "¿Evitar situaciones que le ponen nervioso?" }
  ];

  const opciones = [
    { texto: "Nada (En ningún momento)", valor: 0 },
    { texto: "Algo (Raro, menos de un día o dos)", valor: 1 },
    { texto: "Leve (Varios días)", valor: 2 },
    { texto: "Moderado (Más de la mitad de los días)", valor: 3 },
    { texto: "Grave (Casi cada día)", valor: 4 }
  ];

  // funcion para manejar la seleccion de una opcion
  const handleSelect = (valor) => {
    const preguntaId = preguntas[indicePregunta].id;

    const nuevasRespuestas = { ...respuestas, [preguntaId]: valor };
    setRespuestas(nuevasRespuestas);
  
    if (indicePregunta === preguntas.length - 1) {  // si es ultima pregunta
      setTimeout(() => {
        guardarRespuestas(nuevasRespuestas);
      }, 300);
    } else {  // si no lo es avanzamos a la siguiente pregunta
      setTimeout(() => {
        setIndicePregunta((prev) => prev + 1);
      }, 300);
    }
  
    setAnimacion(true);
    setTimeout(() => setAnimacion(false), 300);
  };


  // guardo las respuestas en la base de datos
  const guardarRespuestas = async (respuestasFinales) => {
    try {
      await axios.post("http://localhost:5000/guardar-respuestas", {
        idSesion,
        respuestas: respuestasFinales
      });
      navigate("/analisis-detallado");
    } catch (err) {
      console.error("Error al guardar las respuestas:", err);
      alert("Error al guardar las respuestas");
    }
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