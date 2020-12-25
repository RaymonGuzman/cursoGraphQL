import React, { Fragment } from 'react';
import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/router';

const layout = ({ children }) => {
  const router = useRouter();

  return (
    <Fragment>
      <head>
        <title>CRM - Administración de Clientes</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
        />
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </head>

      {router.pathname === '/login' || router.pathname === '/nuevacuenta' ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
          <div>{children}</div>
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="sm:w2/3 xl:4/5 sm:min-h-screen p-5">
              {children}
            </main>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default layout;
