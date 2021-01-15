import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const OBTENER_USUARIO = gql`
  {
    obtenerUsuario {
      id
      nombre
      apellido
      email
    }
  }
`;

const Header = () => {
  const { data, loading, error, client } = useQuery(OBTENER_USUARIO);
  const router = useRouter();

  if (loading) return <p>Loading...</p>;

  if (!data?.obtenerUsuario) {
    router.push('/login');
    return <p>Cargado...</p>;
  }
  const { nombre, apellido } = data.obtenerUsuario;

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    client.clearStore();
    router.push('/login');
  };

  return (
    <div className="flex justify-between mb-6">
      <p className="mr-2">
        Hola {nombre} {apellido}
      </p>
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded font-bold text-sm shadow-md hover:bg-blue-500"
        type="button"
        onClick={() => cerrarSesion()}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Header;
