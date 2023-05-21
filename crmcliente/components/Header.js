import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const OBTENER_USUARIO = gql`
  {
    obtenerUsuarioAutenticado {
      id
      nombre
      apellido
      email
      rol
    }
  }
`;

const Header = () => {
  const { data, loading, error, client } = useQuery(OBTENER_USUARIO);
  const router = useRouter();

  if (loading) return <p>Loading...</p>;

  if (!data?.obtenerUsuarioAutenticado) {
    router.push('/login');
    return <p>Cargado...</p>;
  }
  const { nombre, apellido, rol } = data.obtenerUsuarioAutenticado;

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    client.clearStore();
    router.push('/login');
  };

  return (
    <>
      <div className="sm:flex sm:justify-between mb-0">
        <p className="mr-25 mb-0 lg:mb-0">
          Hola {nombre} {apellido}
        </p>
        <button
          className="bg-gray-800 w-full sm:w-auto text-white px-4 py-2 rounded font-bold text-sm shadow-md hover:bg-blue-500"
          type="button"
          onClick={() => cerrarSesion()}
          >
          Cerrar Sesión
        </button>

      </div>
      <div className="mb-6 mt-0">
        <p>
          {rol=== 'admin' ? 'Administrador(a)' : 'Vendedor(a)'}
        </p>
      </div>
    </>
  );
};

export default Header;
