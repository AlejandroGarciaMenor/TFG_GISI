import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RetoDiario = ({ userId }) => {

    const [reto, setReto] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(true);
    const [retoCompletado, setRetoCompletado] = useState(false);
    const [racha, setRacha] = useState(null);

    const obtenerReto = async () => {
        try {
            setCargando(true);
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
            console.error("Error cargando el reto diario", error);
        } finally {
            setCargando(false);
        }
    };

    const obtenerRacha = async () => {
        try {
            const res = await axios.get('https://localhost:5000/racha', { 
                params: { userId } 
            });
            setRacha(res.data.racha);
        } catch (error) {
            console.error("Error cargando la racha", error);
            setRacha(null);
        }
    }

    useEffect(() => {
       obtenerReto();
       obtenerRacha();
    }, [userId]);

    const completarReto = async () => {
        setReto((prevReto) => {
            const nuevoReto = { ...prevReto, completado: true };
            return nuevoReto;
        });
        setRetoCompletado(true);
        try {
            await axios.post('https://localhost:5000/completar-reto-diario', {
                idUsuarioReto: reto.id_usuario_reto,
            });
        } catch (error) {
            console.error("Error completando el reto diario", error);
            setReto((prevReto) => ({ ...prevReto, completado: false }));
        } finally {
            setTimeout(() => { setRetoCompletado(false); }, 3000);
        }
    };
    

    if (cargando) {
        return <p>Cargando reto diario...</p>;
    }

    return (
        <div className={`reto-diario-container ${reto?.completado ? 'reto-completado' : ''}`}>
            <h3 className='reto-diario-titulo'>Este es tu reto del día!</h3>
            {mensaje ? (
                <p>{mensaje}</p>
            ) : reto ? (
                <div className="reto-item">
                    <h3 className="reto-categoria">{reto.categoria}</h3>
                    <p className='racha'>Llevas una racha de {racha || 0} días</p>
                    <p className="reto-contenido">{reto.contenido}</p>
                    <button 
                        className={`boton-completar-reto ${reto.completado ? 'boton-completado' : ''}`} 
                        onClick={completarReto} 
                        disabled={reto.completado}>
                        {reto.completado ? 'Reto Completado' : 'Marcar reto como completado'}
                    </button> 
                </div>
            ) : (
                <p>No hay retos disponibles para hoy.</p>
            )}
        </div>
    );

};

export default RetoDiario;