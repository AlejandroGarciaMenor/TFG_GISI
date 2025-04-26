import React from "react";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import "../styles/EstadisticasUsuario.css";

const EstadisticasUsuario = ({ puntuaciones_gravedad }) => {
    const datosGrafico = (puntuaciones_gravedad).map((item) => ({
        fecha: new Date(item.fecha).toLocaleDateString(), 
        puntuacion: item.puntuacion_gravedad || 0, 
    }));

    const getColor = (puntuacion) => {
        if (puntuacion < 15) return "#00796b";
        if (puntuacion <= 20) return "#eec686";
        if (puntuacion <= 27) return "#f0953a";
        return "#e25858";
    }

    return (
        <div className="estadisticas-usuario-container">
            <h2 className="estadisticas-usuario-titulo">
                <span className="material-symbols-outlined">bar_chart</span>
                Evolución de los niveles de ansiedad
            </h2>
            <p className="estadisticas-usuario-descripcion">
                A continuación se muestra la evolución de los niveles de ansiedad a lo largo del tiempo. 
                Las puntuaciones que observas son el resultado del cuestionario de gravedad
                <a href="https://www.promishealth.org/" target="__blank"> PROMIS® Emotional Distress - Anxiety – Short Form 7a. </a>
                Este cuestionario sirve para evaluar el nivel de ansiedad de un adulto en los últimos 7 días y hacer un seguimiento de su evolución.
                Si faltan más del 25% de las respuestas, el resultado no es válido.
                Las puntuaciones se corresponden a un nivel (aproximado) de ansiedad:
                <br />
            </p>
            <ul className="estadisticas-usuario-explicacion">
                <li className="categoria-muy-baja">Menor a 15: Nula o muy baja</li>
                <li className="categoria-leve">Entre 15 y 20: Leve</li>
                <li className="categoria-moderada">Entre 21 y 27: Moderada</li>
                <li className="categoria-severa">Mayor a 28: Severa</li>
            </ul>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={datosGrafico}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="fecha" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="puntuacion" label={{ position: "top" }} isAnimationActive={true}>
                        {datosGrafico.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getColor(entry.puntuacion)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EstadisticasUsuario;