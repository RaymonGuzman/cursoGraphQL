import React, { useState, useEffect } from "react";

const Pedido = ({ pedido }) => {
    const { id, total, cliente, estado } = pedido;

    const [estadoPedido, setEstadoPedido] = useState(estado);

    // console.log(pedido.pedido);

    useEffect(() => {
        if (estadoPedido) {
            setEstadoPedido(estadoPedido);
        }
    }, [estadoPedido]);

    return (
        <div className="mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap4 shadow-lg">
            <div>
                <p className="font-bold text-gray-800">Cliente: {cliente}</p>

                <h2 className="text-gray-800 font-bold mt-10">Estado Pedido:</h2>

                <select
                    className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
                    value={estadoPedido}
                >
                    <option values="COMPLETADO">COMPLETADO</option>
                    <option values="PENDIENTE">PENDIENTE</option>
                    <option values="RECHAZADO">RECHAZADO</option>
                </select>
            </div>
            <div>
                <h2 className="text-gay-800 font-bold mt-2">Resumen del Pedido</h2>
                {pedido.pedido.map((articulo) => (
                    <div key={articulo.id} className="mt-4">
                        <p className="text-sm text-gray-600">Producto: {articulo.nombre}</p>
                        <p className="text-sm text-gray-600">Cantidad: {articulo.cantidad}</p>
                    </div>
                ))}

                <p className="text-gray-800 mt-3 font-bold">
                    Total a pagar:
                    <span className="font-light"> $ {total}</span>
                </p>

                <button className="uppercase text-xs front-bold flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight">
                    Eliminar Pedido
                    <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Pedido;
