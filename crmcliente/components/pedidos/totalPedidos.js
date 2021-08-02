import React, { useContext } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';



const totalPedidos = () => {
  const context = useContext(PedidoContext);
  const { total } = context;
  return (
    <div className="flex mt-5 justify-between bg-white p-3">
      <h2 className="text-gray-800 text-lg">Total</h2>
      <p className="text-gray-800 mt-1">$ {total}</p>
    </div>

  );
}

export default totalPedidos;