import React, { useContext } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';



const totalPedidos = () => {
  const context = useContext(PedidoContext);
  const { total } = context;
  return (
    <>
      <h4>Total</h4>
      <p>{total}</p>
    </>

  );
}

export default totalPedidos;