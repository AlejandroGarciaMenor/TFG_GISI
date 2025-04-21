import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './styles/MinijuegoRespiracion478.css';
import sonidoRelajante from './audio/relaxation-music-49-50061.mp3';

const pasos = [
    {nombre: "Inhala", duracion: 4000},
    {nombre: "Mantén", duracion: 7000},
    {nombre: "Exhala", duracion: 8000},
];

const audio = new Audio(sonidoRelajante);
audio.loop = true;

const MinijuegoRespiracion478 = () => {
    
    const [pasoIndex, setPasoIndex] = useState(0);
    const [esActivo, setEsActivo] = useState(false);
    const [tipoCirculo, setTipoCirculo] = useState('');
    const [ronda, setRondas] = useState(1);
    const [numeroRondas, setNumeroRondas] = useState(1);
    const [pausado, setPausado] = useState(false);

    const navigate = useNavigate();
    
    // temporizador para controlar el paso del juego
    useEffect(() => {
        let temporizador;
        if(esActivo && !pausado){
            const pasoActual = pasos[pasoIndex];
            if(pasoIndex === 0) setTipoCirculo('aumentar');
            if(pasoIndex === 1) setTipoCirculo('mantener');
            if(pasoIndex=== 2) setTipoCirculo('contraer');

            temporizador = setTimeout(() => {
                const siguienteIndex = (pasoIndex + 1) % pasos.length;

                if(siguienteIndex === 0){
                    if(ronda < numeroRondas){
                        setRondas(ronda + 1);
                    } else {
                        setEsActivo(false);
                        audio.pause();
                        audio.currentTime = 0;
                        return;
                    }
                }

                setPasoIndex(siguienteIndex);
            }, pasoActual.duracion);
        }
        return () => clearTimeout(temporizador);
    }, [pasoIndex, esActivo, pausado]); // tiene que cambiar el paso o estar activo

    const comenzarRespiracion = () => {
        setEsActivo(true);
        setPasoIndex(0);
        setRondas(1);
        audio.play();
    };

    const pausarOReanudar = () => {
        if (pausado) {
            setPausado(false);
            audio.play();
        } else {
            setPausado(true);
            audio.pause();
        }
    };

    const salir = () => {
        audio.pause();
        audio.currentTime = 0;
        setEsActivo(false);
        setPasoIndex(0);
        setRondas(1);
        navigate('/perfil-usuario');
    }

    return (
        <div className="minijuego-container">
            <h3 className="minijuego-titulo">Relajación 4-7-8</h3>
            <p className="minijuego-instrucciones">Siéntate cómodamente, con la espalda recta. Inhala por la nariz durante 4 segundos, mantén la respiración durante 7 segundos y exhala por la boca durante 8 segundos.</p>
            {!esActivo && (
                <div className="configuracion-rondas">
                    <label htmlFor="numero-rondas">Número de rondas:</label>
                    <input id="numero-rondas" type="number" min="1" max="10" value={numeroRondas} onChange={(e) => setNumeroRondas(e.target.value)} />
                </div>
            )}

            {esActivo && !pausado && <p className="texto-respiracion">{pasos[pasoIndex].nombre}</p>}
            {esActivo && <p className="texto-ronda">Ronda {ronda} / {numeroRondas}</p>}
            
            <div className={`circulo-respiracion ${tipoCirculo}`}></div>
            
            { !esActivo && (
                <button className="boton-comenzar-minijuego" onClick={comenzarRespiracion}>Comenzar Minijuego</button>
            )}

            { esActivo && (
                <div className="botones-control">
                    <button className="boton-control" onClick={pausarOReanudar}>
                        {pausado ? 'Reanudar' : 'Pausar'}
                    </button>
                    <button className="boton-control salir" onClick={salir}>Salir</button>
                </div>
            )}
        </div>
    );

};

export default MinijuegoRespiracion478;