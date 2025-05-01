import React, { useState, useEffect } from "react";
import {
  VStack,
  Box,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export default function Home() {

  const navigate = useNavigate();

  return (
    <VStack spacing={10} p={8} align="center">
      <Heading as="h1" size="2xl" mt={4} color="blue.600">
        SERENA
      </Heading>

      <Box display="flex" gap={6}>
        <Button colorScheme="blue" size="lg" onClick={() => navigate("/register")}>
          Registrarse
        </Button>
        <Button variant="outline" colorScheme="blue" size="lg" onClick={() => navigate("/login")}>
          Iniciar sesión
        </Button>
      </Box>

    </VStack>
  );
}