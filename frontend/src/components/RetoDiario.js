import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/RetoDiario.css';

const RetoDiario = ({ userId, tipos_ansiedad_detectados }) => {
    const servidorURL = process.env.REACT_APP_SERVER_IP_PORT;
    const token = sessionStorage.getItem("token");
    console.log(token);
    console.log(userId);
    const [reto, setReto] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(true);
    const [retoCompletado, setRetoCompletado] = useState(false);
    const [racha, setRacha] = useState({ mejor_racha: 0, racha_actual: 0 });

    const obtenerReto = async () => {
        try {
            setCargando(true);

            // si tipos_ansiedad_detectados es nulo, ponemos id_ansiedad 0 por defecto para que siga devolviendo retos generales
            const tiposAnsiedad = (!Array.isArray(tipos_ansiedad_detectados) || tipos_ansiedad_detectados.length === 0)
                ? [{ id_ansiedad: 0 }]
                : tipos_ansiedad_detectados;

            const res = await axios.get(`${servidorURL}/reto-diario/obtener-reto-diario`, { 
                params: { userId, tipos_ansiedad_detectados: tiposAnsiedad } ,
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('Respuesta del backend (reto diario):', res.data);

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
            const res = await axios.get(`${servidorURL}/reto-diario/racha` , {
                params: { userId } ,
                headers: { Authorization: `Bearer ${token}` }
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
    }, [userId, token]);

    const completarReto = async () => {
        setReto((prevReto) => {
            const nuevoReto = { ...prevReto, completado: true };
            return nuevoReto;
        });
        setRetoCompletado(true);
        try {
            await axios.post(`${servidorURL}/reto-diario/completar-reto-diario`, 
                {idUsuarioReto: reto.id_usuario_reto},
                {headers: { Authorization: `Bearer ${token}` }} 
            );
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
            <h3 className='reto-diario-titulo'>
                <span className="material-symbols-outlined">target</span>
                El reto del día
            </h3>
            <small style={{ color: "#666", display: "block", marginBottom: "15px" }}>
                Estos retos están pensados para que los realices de forma autónoma en cualquier momento del día. Cuando lo hayas hecho, puedes marcarlo como completado.
            </small>
            {mensaje ? (
                <p>{mensaje}</p>
            ) : reto ? (
                <div className="reto-item">
                    <div className="rachas-container">
                        <div className="racha-item">
                            <div className="racha-circulo">
                                <span className="material-symbols-outlined racha-icono">app_badging</span>
                                <span className="racha-numero">{racha.mejor_racha || 0}</span>
                            </div>
                            <p className="racha-texto">Mejor racha histórica</p>
                        </div>
                        <div className="racha-item">
                            <div className="racha-circulo">
                                <span className="material-symbols-outlined racha-icono">app_badging</span>
                                <span className="racha-numero">{racha.racha_actual || 0}</span>
                            </div>
                            <p className="racha-texto">Racha actual</p>
                        </div>
                    </div>
                    {reto.id_ansiedad !== 0 ? (
                        <p className='reto-diario-finalidad'>Finalidad del reto: Hoy te proponemos un reto especial para ayudarte a manejar el tipo de trastorno de ansiedad que fue detectado por Serena, el {reto.nombre}</p>
                    ):(
                        <p className='reto-diario-finalidad'>Finalidad del reto: El reto de hoy es útil para manejar cualquier tipo e intensidad de ansiedad!</p>
                    )}
                    <h3 className="reto-diario-estrategia">Estrategia del reto: {reto.categoria}</h3>

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