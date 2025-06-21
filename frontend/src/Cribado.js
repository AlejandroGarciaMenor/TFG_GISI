import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/PaginaCuestionario.css";

const Cribado = () => {
  const servidorURL = process.env.REACT_APP_SERVER_IP_PORT;
  const navigate = useNavigate();
  const nombre = sessionStorage.getItem("nombre");
  const userId = sessionStorage.getItem("id");
  const token = sessionStorage.getItem("token");
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [animacion, setAnimacion] = useState(false);
  const [idSesion, setIdSesion] = useState(null);

  // creo una sesion de cribado
  useEffect(() => {
    let sesionIniciada = false;
    const iniciarSesionCribado = async () => {
      if (sesionIniciada) return;
      sesionIniciada = true;
      try {
        const res = await axios.post(`${servidorURL}/cuestionarios/iniciar-sesion-cribado`, 
          { userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIdSesion(res.data.idSesion);
      } catch (err) {
        console.error("Error al iniciar la sesión de cribado:", err);
      }
    };
    iniciarSesionCribado();
  }, [userId, token]);

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
        evaluarRespuestas(nuevasRespuestas);
      }, 300);
    } else {  // si no lo es avanzamos a la siguiente pregunta
      setTimeout(() => {
        setIndicePregunta((prev) => prev + 1);
      }, 300);
    }
  
    setAnimacion(true);
    setTimeout(() => setAnimacion(false), 300);
  };

  // funcion para evaluar las respuestas
  const evaluarRespuestas = (respuestasFinales) => {
    const valores = Object.values(respuestasFinales);
    const valoresMenoresUmbral = valores.every((valor) => valor < 2);

    if(valoresMenoresUmbral){
      guardarRespuestas(respuestasFinales);
      navigate("/perfil-usuario");
    } else {
      guardarRespuestas(respuestasFinales);
      navigate("/gravedad");
    }
  }


  // guardo las respuestas en la base de datos
  const guardarRespuestas = async (respuestasFinales) => {
    try {
      await axios.post(`${servidorURL}/cuestionarios/guardar-respuestas`, 
        { idSesion, respuestas: respuestasFinales},
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
        Realizaremos un breve cribado sobre tu estado emocional basado en la   
        <a href="https://www.psychiatry.org/news-room/news-releases/asociacion-americana-de-psiquiatria-publica-el-man" target="_blank">
          Medida de síntomas transversales del DSM-5
        </a>. 
        Esta medida de 3 preguntas es una herramienta utilizada en fases iniciales de evaluación para conocer tu estado y determinar si es necesario realizar una evaluación más profunda.
      </p>
      <p className="descripcion">
        Durante las últimas DOS (2) SEMANAS,<strong> ¿cuánto (o con qué frecuencia) le han perturbado los siguientes problemas?</strong>
      </p>

      <div className={`pregunta-card ${animacion ? "salida" : "entrada"}`}>
        <h2 className="pregunta-texto">{preguntas[indicePregunta].texto}</h2>
        {opciones.map((opcion, index) => (
          <button key={index} className={`boton-opcion opcion-${opcion.valor}`} onClick={() => handleSelect(opcion.valor)}>
            {opcion.texto}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Cribado;