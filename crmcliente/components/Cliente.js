import React from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const ELIMINAR_CLIENTE = gql`
  mutation eliminarCliente($id: ID!) {
    eliminarCliente(id: $id)
  }
`;

const CLIENTES_VENDEDOR = gql`
  query obtenerClienteVendedor {
    obtenerClienteVendedor {
      id
      nombre
      apellido
      empresa
      email
      vendedor
    }
  }
`;

const Cliente = ({ cliente }) => {
  const { id, nombre, apellido, empresa, email } = cliente;

  const router = useRouter();

  const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
    update(cache) {
      const { obtenerClienteVendedor } = cache.readQuery({
        query: CLIENTES_VENDEDOR,
      });

      cache.writeQuery({
        query: CLIENTES_VENDEDOR,
        data: {
          obtenerClienteVendedor: obtenerClienteVendedor.filter(
            (clienteActual) => clienteActual.id !== id
          ),
        },
      });
    },
  });

  const editarCliente = () => {
    // console.log('Editando id ', id);
    router.push({
      pathname: '/actualizarcliente/[id]',
      query: { id }
    });
  };

  const removerCliente = ({ id }) => {
    // console.log(id);
    Swal.fire({
      title: '¿Seguro que desea eliminar el cliente?',
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
          const { data } = await eliminarCliente({
            variables: {
              id,
            },
          });

          Swal.fire('Eliminado!', data.eliminarCliente, 'success');
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  return (
    <>
      <td className="border px-4 py-2 border-gray-300">
        {nombre} {apellido}
      </td>
      <td className="border px-4 py-2 border-gray-300">{empresa}</td>
      <td className="border px-4 py-2 border-gray-300">{email}</td>
      <td className="border px-5 py-2 border-gray-300">
        <button
          className="flex justifiy-center items-center m-3 bg-green-600 text-white font-bold px-4 py-1 rounded hover:bg-red-800"
          onClick={() => editarCliente({ id })}
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
          onClick={() => removerCliente({ id })}
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

export default Cliente;
<svg
  className="w-6 h-6"
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
</svg>;
