import React, { useContext } from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/asignarcliente';
import PedidoContext from '../context/pedidos/PedidoContext';

const nuevospedidos = () => {
  const context = useContext(PedidoContext);
  const { prueba, total } = context;
  console.log(total);
  prueba();
  return (
    <Layout>
      <h1>Nuevos Pedidos</h1>
      <AsignarCliente/>
    </Layout>
  );
};

export default nuevospedidos;
