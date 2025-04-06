const promptBase = require("./promptBase");

const generarPromptPersonalizado = (puntuacion_respuestas, puntuacion_gravedad) => {
  return `
Contexto del usuario:

El usuario ha completado un cuestionario estructurado de ansiedad diseñado para detectar posibles síntomas asociados con distintos trastornos de ansiedad, basados en criterios del DSM-5.

- Puntuaciones de cribado: son las respuestas del usuario a la Medida de síntomas transversales de nivel 1 del DSM-5 autoevaluada: adulto.
  Las equivalencias de puntuación son las siguientes: 
  0: En ningún momento; 
  1: Raro, menos de un día o dos; 
  2: Leve, varios días; 
  3: Moderado, más de la mitad de los días; 
  4: Grave (casi cada día).
  Las preguntas a las que el usuario ha contestado son:
    + ¿Sentirse nervioso, ansioso, preocupado o al límite?: ${puntuacion_respuestas[0] || "No disponible"}.
    + ¿Sentir pánico o estar atemorizado?: ${puntuacion_respuestas[1] || "No disponible"}.
    + ¿Evitar situaciones que le ponen nervioso?: ${puntuacion_respuestas[2] || "No disponible"}.

- Puntuación de gravedad: es la puntuación calculada de las respuestas al cuestionario PROMIS LEVEL 2—Anxiety—Adult.
  Las puntuaciones pueden ser de:
    - 0 a 15: Nivel de ansiedad nulo o muy leve.
    - 16 a 20: Nivel de ansiedad leve.
    - 21 a 27: Nivel de ansiedad moderado.
    - 28 a 35: Nivel de ansiedad severo.
  La puntuación de gravedad es: ${puntuacion_gravedad || "No disponible"}.

${promptBase}
  `;
};

module.exports = generarPromptPersonalizado;