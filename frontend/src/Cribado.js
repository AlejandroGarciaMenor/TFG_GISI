import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cribado = ({ nombre = "Usuario" }) => {
  const navigate = useNavigate();
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [respuestas, setRespuestas] = useState({});

  const preguntas = [
    { id: "p1", texto: "¿Sentirse nervioso, ansioso, preocupado o al límite?" },
    { id: "p2", texto: "¿Sentir pánico o estar atemorizado?" },
    { id: "p3", texto: "¿Evitar situaciones que le ponen nervioso? " }
  ];

  const opciones = [
    { texto: "Nada (En ningún momento)", valor: 0 },
    { texto: "Algo (Raro, menos de un día o dos)", valor: 1 },
    { texto: "Leve (Varios días)", valor: 2 },
    { texto: "Moderado (Más de la mitad de los días)", valor: 3 },
    { texto: "Grave (casi cada día)", valor: 4 }
  ];

  const handleSelect = (valor) => {
    setRespuestas((prev) => ({ ...prev, [preguntas[indicePregunta].id]: valor }));
    if (indicePregunta < preguntas.length - 1) {
      setTimeout(() => setIndicePregunta(indicePregunta + 1), 500);
    } else {
      calcularResultado();
    }
  };

  const calcularResultado = () => {
    const total = Object.values(respuestas).reduce((acc, val) => acc + val, 0);
    if (total >= 6) {
      navigate("/analisis-detallado");
    } else {
      alert("No presentas síntomas preocupantes.");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-100 p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Bienvenido, {nombre}!</h1>
        <p className="text-lg text-gray-700 mt-2">Vamos a realizar un breve cribado sobre tu estado emocional.</p>
      </div>

      <div key={indicePregunta} className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <h2 className="text-xl font-semibold mb-4">{preguntas[indicePregunta].texto}</h2>
        <div className="space-y-3">
          {opciones.map((opcion, index) => (
            <button
              key={index}
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition"
              onClick={() => handleSelect(opcion.valor)}
            >
              {opcion.texto}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cribado;
