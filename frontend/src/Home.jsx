import React, { useState, useEffect } from "react";
import {
  VStack,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import {motion} from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionText = motion(Text);
const TituloAnimado = () => (
  <MotionText fontSize={{ base: "2xl", md: "4xl" }} color="#00796b" textAlign="center" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2 }}>
    <span style={{ color: "#004d40" }}>S</span>istema de{" "}
    <span style={{ color: "#004d40" }}>E</span>valuación y{" "}
    <span style={{ color: "#004d40" }}>RE</span>come<span style={{ color: "#004d40" }}>N</span>daciones para la{" "}
    <span style={{ color: "#004d40" }}>A</span>nsiedad
  </MotionText>
);

const caracteristicasApp = [
  {
    titulo: "Cuestionarios de autoevaluación",
    descripcion: "Podrás completar dos cuestionarios para evaluar tu estado emocional inicial y tu nivel de ansiedad.",
  },
  {
    titulo: "Chatbot SERENA",
    descripcion: "Podrás contarle cómo te sientes y qué síntomas predominan en ti. SERENA tratará de guiarte en que tipo de trastorno de ansiedad podrías estar padeciendo y contestarte a todas tus preguntas.",
  },
  {
    titulo: "Página de perfil de usuario",
    descripcion: "Tu lugar de referencia, donde podrás ver tu evolución, historial de conversaciones y encontrar herramientas de ayuda.",
  },
  {
    titulo: "Ayuda urgente",
    descripcion: "Si detectamos que tu ansiedad es severa, te guiaremos en la búsqueda de ayuda profesional."
  }
]  

export default function Home() {

  const navigate = useNavigate();
  const [caracteristicaActual, setCaracteristicaActual] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCaracteristicaActual((prev) => (prev + 1) % caracteristicasApp.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <VStack spacing={16} p={8} align="center">
      <TituloAnimado />

      <Box w="1000px" h="150px" p={4} borderRadius="md" boxShadow="lg" bg="#a8d1c5" mt={4}>
        <Text fontSize="xl" fontWeight="bold" color="#000000" textAlign="center">
          {caracteristicasApp[caracteristicaActual].titulo}
        </Text>
        <Text fontSize="lg" color="#000000" textAlign="center" mt={2}>
          {caracteristicasApp[caracteristicaActual].descripcion}
        </Text>
        <Box display="flex" justifyContent="center" mt={4}>
          {caracteristicasApp.map((_, index) => (
            <Box key={index} w={3}  h={3}  mx={1}  borderRadius="50%"  bg={index === caracteristicaActual ? "#00796b" : "gray.300"}
            />
          ))}
        </Box>
      </Box>

      <Box display="flex" flexDirection="row" alignItems="center" gap={6} mt={8}>
        <Box w="400px" p={4} borderRadius="md" boxShadow="lg" textAlign="center">
          <Text fontSize="sm" color="gray.600" mb={4}>
            Si nunca has utilizado la app, crea un perfil y realiza un primer proceso evaluación, realizando los cuestionarios y hablando con SERENA.
          </Text>
          <Button bg="#00796b" color="white" _hover={{ bg: "#388e3c" }} size="lg" onClick={() => navigate("/register")}>
            Registrarse
          </Button>
        </Box>
        <Box w="400px" p={4} borderRadius="md" boxShadow="lg" textAlign="center">
          <Text fontSize="sm" color="gray.600" mb={4}>
            Accede a tu perfil para ver tu progreso y herramientas de ayuda. Puedes iniciar un nuevo proceso de evaluación desde tu perfil.
          </Text>
          <Button bg="#00796b" color="white" _hover={{ bg: "#388e3c" }} size="lg" onClick={() => navigate("/login")}>
            Iniciar Sesión
          </Button>
        </Box>
      </Box>

      <Text fontSize="sm" color="gray.600" textAlign="center" maxW="3xl" mt={12}>
          <strong>Recuerda:</strong> Esta plataforma nunca diagnosticará un tipo de
          trastorno de ansiedad, simplemente sirve como una orientación para
          acompañar al usuario. Si necesitas más ayuda, puedes consultar a un
          profesional de la salud mental.
        </Text>

    </VStack>
  );
}