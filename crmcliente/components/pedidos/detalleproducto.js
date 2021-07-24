import React, { useContext, useEffect, useState } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';

const DetalleProducto = ({ producto }) => {
  const [cantidad, setCantidad] = useState(0);
  const context = useContext(PedidoContext);
  const { asignarProductoCantidad } = context;

  const { nombre, precio } = producto;
  const nuevoProducto = { ...producto, cantidad: cantidad };
  useEffect(() => {
    asignarProductoCantidad(nuevoProducto)
  }, [cantidad]);
  return (
    <div className="md:flex md:justify-between md:item-center mt-5">
      <div className="md:w-2/4 mb-2 md:mb-0">
        <p className="text-sm">{nombre}</p>
        <p>$ {precio}</p>
      </div>
      <input
        type="number"
        placeholder="Cantidad"
        className="shadow apperance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
        onChange={e => setCantidad(e.target.value)}
      />

    </div>
  );
}

export default DetalleProducto;