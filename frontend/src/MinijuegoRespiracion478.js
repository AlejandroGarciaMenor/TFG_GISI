import React, {useEffect, useState} from "react";

const pasos = [
    {nombre: "Inhala", duracion: 4000},
    {nombre: "Mantén", duracion: 7000},
    {nombre: "Exhala", duracion: 8000},
];

const MinijuegoRespiracion478 = () => {
    
    const [pasoIndex, setPasoIndex] = useState(0);
    const [esActivo, setEsActivo] = useState(false);

    
    // temporizador para controlar el paso del juego
    useEffect(() => {
        let temporizador;
        if(esActivo){
            const pasoActual = pasos[pasoIndex];


            temporizador = setTimeout(() => {
                const siguienteIndex = (pasoIndex + 1) % pasos.length;
                setPasoIndex(siguienteIndex);
            }, pasoActual.duracion);
        }
        return () => clearTimeout(temporizador);
    }, [pasoIndex, esActivo]); // tiene que cambiar el paso o estar activo

    const comenzarRespiracion = () => {
        setEsActivo(true);
        setPasoIndex(0);
    };

    return (
        <div className="minijuego-container">

            <p className="texto-respiracion">{pasos[pasoIndex].nombre}</p>
            { !esActivo && (
                <button className="boton-comenzar-minijuego" onClick={comenzarRespiracion}>Comenzar Minijuego</button>
            )}
        </div>
    );

};

export default MinijuegoRespiracion478;