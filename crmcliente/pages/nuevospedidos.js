import React, { useContext } from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/asignarcliente';
import AsignarProducto from '../components/pedidos/asignarproducto';
import ListarProductos from '../components/pedidos/listarproductos';
import PedidoContext from '../context/pedidos/PedidoContext';


const nuevospedidos = () => {
  const context = useContext(PedidoContext);
  return (
    <Layout>
      <h1>Nuevos Pedidos</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente/>
          <AsignarProducto/>
          <ListarProductos />
        </div>
      </div>
    </Layout>
  );
};

export default nuevospedidos;
