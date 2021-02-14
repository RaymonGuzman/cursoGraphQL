import React, { Fragment } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

const Pedidos = () => {
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800"> Pedidos </h1>

        <Link href="/nuevospedidos">
          <a className="bg-gray-800 text-white px-3 py-2 mb-3 inline-block rounded font-bold text-sm shadow-md hover:bg-blue-500">
            Nuevos Pedidos
          </a>
        </Link>
      </Layout>
    </div>
  );
};

export default Pedidos;
