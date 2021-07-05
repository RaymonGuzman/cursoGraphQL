import React from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/asignarcliente';

const nuevospedidos = () => {
  return (
    <Layout>
      <h1>Nuevos Pedidos</h1>
      <AsignarCliente/>
    </Layout>
  );
};

export default nuevospedidos;
