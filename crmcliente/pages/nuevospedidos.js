import React, { useContext } from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/asignarcliente';
import AsignarProducto from '../components/pedidos/asignarproducto';
import ListarProductos from '../components/pedidos/listarproductos';
import PedidoContext from '../context/pedidos/PedidoContext';
import TotalPedidos from '../components/pedidos/totalPedidos';

const nuevospedidos = () => {
  const context = useContext(PedidoContext);
  const { productos, total, cliente } = context;

  console.log(Object.keys(cliente).length);
  const validarPedido = () => {
    return !productos.every(producto => producto.cantidad > 0) || total === 0 || Object.keys(cliente).length === 0 ? " opacity-50 cursor-not-allowed " : "";
  }

  return (
    <Layout>
      <h1>Nuevos Pedidos</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente />
          <AsignarProducto />
          <ListarProductos />
          <TotalPedidos />
          <input
            type="button"
            className={`w-full bg-gray-800 mt-5 py-2 text-white uppercase hover:bg-gray-600 ${validarPedido()}`}
            value="Registrar Pedido"
          />
        </div>
      </div>
    </Layout>
  );
};

export default nuevospedidos;
