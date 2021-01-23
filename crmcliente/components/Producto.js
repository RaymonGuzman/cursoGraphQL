import React from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import Swal from 'sweetalert2';
import { Router, useRouter } from 'next/router';

const ELIMINAR_CLIENTE = gql`
  mutation eliminarProducto($id: ID!) {
    eliminarProducto(id: $id)
  }
`;
const OBTENER_PRODUCTOS = gql`
  {
    obtenerProductos {
      id
      nombre
      modelo
      existencia
      precio
      creado
    }
  }
`;

const Producto = ({ producto }) => {
  const router = useRouter();

  const { id, nombre, modelo, existencia, precio } = producto;

  const [eliminarProducto] = useMutation(ELIMINAR_CLIENTE, {
    update(cache) {
      const { obtenerProductos } = cache.readQuery({
        query: OBTENER_PRODUCTOS,
      });

      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: obtenerProductos.filter(
            (clienteActual) => clienteActual.id !== id
          ),
        },
      });
    },
  });
  const removerProducto = async () => {
    // console.log(id);
    Swal.fire({
      title: '¿Seguro que desea eliminar el producto?',
      text: 'Este cambio no se podrá revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await eliminarProducto({
            variables: {
              id,
            },
          });

          Swal.fire('Eliminado!', data.eliminarProducto, 'success');
        } catch (error) {
          console.log(error);
        }
      }
    });
    //
  };

  const editarProducto = () => {
    router.push({
      pathname:'/actualizarproducto/[id]',
      query: { id }
    });
  }
  // console.log(producto.nombre);
  return (
    <>
      <td className="border px-4 py-2 border-gray-300">{nombre}</td>
      <td className="border px-4 py-2 border-gray-300">{modelo}</td>
      <td className="border px-4 py-2 border-gray-300 text-center">
        {existencia}
      </td>
      <td className="border px-4 py-2 border-gray-300 text-center">
        {precio} $
      </td>
      <td className="border px-5 py-2 border-gray-300">
        <button
          className="flex justifiy-center items-center m-3 bg-green-600 text-white font-bold px-4 py-1 rounded hover:bg-green-800"
          onClick={() => editarProducto()}
        >
          Editar
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
      </td>
      <td className="border px-5 py-2 border-gray-300">
        <button
          className="flex justifiy-center items-center m-3 bg-red-600 text-white font-bold px-4 py-1 rounded hover:bg-red-800"
          onClick={() => removerProducto()}
        >
          Eliminar
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
      </td>
    </>
  );
};

export default Producto;
