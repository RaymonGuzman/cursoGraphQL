import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/asignarcliente';
import AsignarProducto from '../components/pedidos/asignarproducto';
import ListarProductos from '../components/pedidos/listarproductos';
import PedidoContext from '../context/pedidos/PedidoContext';
import TotalPedidos from '../components/pedidos/totalPedidos';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const NUEVO_PEDIDO = gql`
  mutation nuevoPedido($input: PedidoInput){
    nuevoPedido(input:$input){
      id
    }
  }
`;

const nuevospedidos = () => {

  const router = useRouter();

  const [mensaje, setMensaje] = useState(null);

  const context = useContext(PedidoContext);
  const { productos, total, cliente } = context;


  //Mutation para crear un nuevo pedido
  const [nuevoPedido] = useMutation(NUEVO_PEDIDO);

  // console.log(Object.keys(cliente).length);
  const validarPedido = () => {
    return !productos.every(producto => producto.cantidad > 0) || total === 0 || Object.keys(cliente).length === 0 
    ? " opacity-50 cursor-not-allowed " : "";
  }

  // Remover lo no deseado

  const pedido = productos.map(({ __typename, existencia, modelo, creado, ...producto }) => producto)
  // console.log(pedido);

  const crearNuevoPedido = async () => {

    const { id } = cliente;
    try {
      const { data } = await nuevoPedido({
        variables: {
          input: {
            cliente: id,
            total,
            pedido
          }
        }
      });
      // console.log(data);
      router.push('/pedidos');
      //Redireccionar

      Swal.fire(
        'Correcto',
        'El pedido se registró correctamente',
        'success'
      )

      // MOstrar alerta
    } catch (error) {
      console.log(error);
      setMensaje(error.message);

      setTimeout(() => {
        setMensaje(null);
      }, 3000);
    }
  }

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center text-red-600 mx-auto">
        <p>{mensaje}</p>
      </div>
    )
  }

  return (
    <Layout>
      <h1>Nuevos Pedidos</h1>
      {mensaje && mostrarMensaje()}
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
            onClick={() => crearNuevoPedido()}
          />
        </div>
      </div>
    </Layout>
  );
};

export default nuevospedidos;
