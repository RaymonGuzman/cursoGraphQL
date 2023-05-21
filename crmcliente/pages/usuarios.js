import React, { Fragment } from 'react';
import Layout from '../components/Layout';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import Usuario from '../components/Usuario';

const OBTENER_USUARIOS = gql`
  query obtenerUsuarios{
    obtenerUsuarios{
      id
      nombre
      apellido
      email
      rol
      creado
    }
  }
`;

const Usuarios = () => {
  const { data, loading, error } = useQuery(OBTENER_USUARIOS);

  if (loading) return <p>Cargando...</p>;
  // console.log(data.obtenerProductos);

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800"> Usuarios </h1>

        <Link href="/nuevacuenta">
          <a className="bg-gray-800 text-white px-3 py-2 mb-3 inline-block rounded font-bold text-sm shadow-md hover:bg-blue-500">
            Nuevos Usuarios
          </a>
        </Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 py-2">Nombre</th>
              <th className="w-1/3 py-2">Apellido</th>
              <th className="w-1 py-2">Email</th>
              <th className="w-1/3 py-2">Rol</th>
              <th className="w-1/3 py-2">Editar</th>
              <th className="w-1/3 py-2">Eliminar</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.obtenerUsuarios.map((usuario) => (
              <tr key={usuario.id}>
                <Usuario usuario={usuario} />
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default Usuarios;
