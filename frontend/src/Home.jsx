import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Home.css";

const caracteristicasApp = [
  {
    titulo: "Cuestionarios de autoevaluación",
    descripcion:
      "Podrás completar dos cuestionarios para evaluar tu estado emocional inicial y tu nivel de ansiedad.",
  },
  {
    titulo: "Chatbot SERENA",
    descripcion:
      "Podrás contarle cómo te sientes y qué síntomas predominan en ti. SERENA tratará de guiarte en qué tipo de trastorno de ansiedad podrías estar padeciendo y contestarte a todas tus preguntas.",
  },
  {
    titulo: "Página de perfil de usuario",
    descripcion:
      "Tu lugar de referencia, donde podrás ver tu evolución, historial de conversaciones y encontrar herramientas de ayuda.",
  },
  {
    titulo: "Ayuda urgente",
    descripcion:
      "Si detectamos que tu ansiedad es severa, te guiaremos en la búsqueda de ayuda profesional.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [caracteristicaActual, setCaracteristicaActual] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCaracteristicaActual((prev) => (prev + 1) % caracteristicasApp.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div className="titulo-animado">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="logo"
        />
        <p className="bienvenida">
          Bienvenido a Serena, el Sistema de Evaluación y REcomeNdaciones para
          la Ansiedad, una aplicación diseñada para acompañarte en la gestión
          de tu ansiedad.
        </p>
      </div>

      <div className="caracteristicas-box">
        <h2 className="caracteristica-titulo">
          {caracteristicasApp[caracteristicaActual].titulo}
        </h2>
        <p className="caracteristica-descripcion">
          {caracteristicasApp[caracteristicaActual].descripcion}
        </p>
        <div className="paginacion">
          {caracteristicasApp.map((_, index) => (
            <span
              key={index}
              className={`punto ${
                index === caracteristicaActual ? "activo" : ""
              }`}
            ></span>
          ))}
        </div>
      </div>

      <div className="botones-container">
        <div className="boton-box">
          <p className="boton-texto">
            Si nunca has utilizado la app, crea un perfil y realiza un primer
            proceso de evaluación, realizando los cuestionarios y hablando con
            SERENA.
          </p>
          <button
            className="boton"
            onClick={() => navigate("/register")}
          >
            Registrarse
          </button>
        </div>
        <div className="boton-box">
          <p className="boton-texto">
            Accede a tu perfil para ver tu progreso y herramientas de ayuda.
            Puedes iniciar un nuevo proceso de evaluación desde tu perfil.
          </p>
          <button
            className="boton"
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión
          </button>
        </div>
      </div>

      <p className="nota">
        <strong>Recuerda:</strong> Esta plataforma nunca diagnosticará un tipo
        de trastorno de ansiedad, simplemente sirve como una orientación para
        acompañar al usuario. Si necesitas más ayuda, puedes consultar a un
        profesional de la salud mental.
      </p>
    </div>
  );
}