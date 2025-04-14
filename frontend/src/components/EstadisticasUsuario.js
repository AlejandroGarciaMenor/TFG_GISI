import React from "react";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const EstadisticasUsuario = ({ puntuaciones_gravedad }) => {
    const datosGrafico = (puntuaciones_gravedad).map((item) => ({
        fecha: new Date(item.fecha).toLocaleDateString(), 
        puntuacion: item.puntuacion_gravedad || 0, 
    }));

    const getColor = (puntuacion) => {
        if (puntuacion <= 15) return "#28a745"; // Verde
        if (puntuacion <= 25) return "#ffc107"; // Amarillo
        return "#dc3545"; // Rojo
    }

    return (
        <div className="estadisticas-usuario">
            <h3>Así ha ido evolucionando tu nivel de ansiedad...</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={datosGrafico}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="fecha" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                        dataKey="puntuacion"
                        label={{ position: "top" }}
                        isAnimationActive={true}
                    >
                        {datosGrafico.map((entry, index) => (
                            <Bar
                                key={`bar-${index}`}
                                dataKey="puntuacion"
                                fill={getColor(entry.puntuacion)} // Aplica el color dinámico
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EstadisticasUsuario;