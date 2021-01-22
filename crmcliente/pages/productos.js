import React, { Fragment } from 'react';
import Layout from '../components/Layout';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import Producto from '../components/Producto';

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

const Productos = () => {
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

  if (loading) return <p>Cargando...</p>;
  // console.log(data.obtenerProductos);

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800"> Productos </h1>

        <Link href="/nuevosproductos">
          <a className="bg-gray-800 text-white px-3 py-2 mb-3 inline-block rounded font-bold text-sm shadow-md hover:bg-blue-500">
            Nuevos Productos
          </a>
        </Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 py-2">Nombre</th>
              <th className="w-1/3 py-2">Modelo</th>
              <th className="w-1 py-2">Existencia</th>
              <th className="w-1/3 py-2">Precio</th>
              <th className="w-1/3 py-2">Editar</th>
              <th className="w-1/3 py-2">Eliminar</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.obtenerProductos.map((producto) => (
              <tr key={producto.id}>
                <Producto producto={producto} />
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default Productos;
