import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RetoDiario = ({ userId }) => {

    const [reto, setReto] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [completado, setCompletado] = useState(false);

    useEffect(() => {
        const obtenerReto = async () => {
            try {
                const res = await axios.get('https://localhost:5000/reto-diario', { 
                    params: { userId } 
                });
                if (res.data.reto === null) {
                    setMensaje(res.data.mensaje);
                    setReto(null);
                } else {
                    setReto(res.data.reto);
                    setMensaje('');
                }
            } catch (error) {
                console.error("Error cargando los tips diarios", error);
            }
        };
       obtenerReto();
    }, [userId]);

    const completarReto = async () => {
        try {
            await axios.post('https://localhost:5000/completar-reto-diario', {
                userId,
                idReto: reto.id_reto
        });
        setCompletado(true);
        } catch (error) {
            console.error("Error completando el reto diario", error);
        }
    }


    return (
        <div className="tips-diarios-container">
            <h2>Reto diario</h2>
            {mensaje ? (
                <p>{mensaje}</p>
            ) : reto ? (
                <div className="reto-item">
                    <h3>{reto.categoria}</h3>
                    <p>{reto.contenido}</p>
                    {!completado ? (
                        <button className='boton-completar-reto' onClick={completarReto}>He completado el reto</button>
                    ) : (
                        <p>¡Reto completado!</p>
                    )}
                </div>
            ) : (
                <p>Cargando reto diario...</p>
            )}
        </div>
    );

};

export default RetoDiario;