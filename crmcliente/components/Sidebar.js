import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
// console.log(router.asPath);

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

const Sidebar = () => {
  const router = useRouter();

  const { data, loading, error } = useQuery(OBTENER_USUARIO);

  if (loading) return <p>Loading...</p>;

  // console.log(data?.obtenerUsuario.rol);

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black"> CRM Clientes </p>
      </div>

      <nav className="mt-5 list-none">
        <li className={router.pathname === '/' ? "bg-blue-500 m-2 p-2" : "p-1"}>
          <Link href="/">
            <a className="text-white mb-2 block">Clientes</a>
          </Link>
        </li>
        <li className={router.pathname === '/pedidos' ? "bg-blue-500 m-2 p-2" : "p-1"}>
          <Link href="/pedidos">
            <a className="text-white mb-2 block">Pedidos</a>
          </Link>
        </li>
        <li className={router.pathname === '/productos' ? "bg-blue-500 m-2 p-2" : "p-1"}>
          <Link href="/productos">
            <a className="text-white mb-2 block">Productos</a>
          </Link>
        </li>
        <li className={router.pathname === '/usuarios' ? "bg-blue-500 m-2 p-2" : "p-1"}>
          <Link href="/usuarios">
            <a className="text-white mb-2 block">Usuarios</a>
          </Link>
        </li>
      </nav>

      <div className="sm:mt-10">
        <p className="text-white text-2xl font-black mt-5"> TOP </p>
      </div>

      <nav className="list-none">
        <li className={router.pathname === '/mejoresclientes' ? "bg-blue-500 m-2 p-2" : "p-1"}>
          <Link href="/mejoresclientes">
            <a className="text-white mb-2 block">Mejores Cientes</a>
          </Link>
        </li>
        {data?.obtenerUsuarioAutenticado && data.obtenerUsuarioAutenticado.rol === 'admin' && (
        <li className={router.pathname === '/mejoresvendedores' ? "bg-blue-500 m-2 p-2" : "p-1"}>
          <Link href="/mejoresvendedores">
            <a className="text-white mb-2 block">Mejores Vendedores</a>
          </Link>
        </li>
        )
        }
      </nav>


      <div className="sm:mt-10">
        <p className="text-white text-2xl font-black mt-5"> Administración </p>
      </div>

      <nav className="list-none">
        <li className={router.pathname === '/nuevosusuarios' ? "bg-blue-500 m-2 p-2" : "p-1"}>
          <Link href="/nuevosusuarios">
            <a className="text-white mb-2 block">Agregar Usuarios</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
