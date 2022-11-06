import React, { Fragment } from "react";
import Layout from "../components/Layout";
import Pedido from "../components/Pedido";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";

const OBTENER_PEDIDOS = gql`
  query obtenerPedidos {
    obtenerPedidos {
      id
      pedido {
        id
        cantidad
        nombre
      }
      total
      cliente
      vendedor
      estado
      creado
    }
  }
`;

const Pedidos = () => {
  const { data, loading, error } = useQuery(OBTENER_PEDIDOS);

  if (loading) return "Cargando...";

  const { obtenerPedidos } = data;

  console.log(data);
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800"> Pedidos </h1>

        <Link href="/nuevospedidos">
          <a className="bg-gray-800 text-white px-3 py-2 mb-3 inline-block rounded font-bold text-sm shadow-md hover:bg-blue-500">
            Nuevos Pedidos
          </a>
        </Link>
        {obtenerPedidos.length === 0 ? (
          <p className="mt-5 text-center text-2xl"> No hay pedidos aún </p>
        ) : (
          obtenerPedidos.map((pedido) => (
            <Pedido key={pedido.id} pedido={pedido} />
          ))
        )}
      </Layout>
    </div>
  );
};

export default Pedidos;
