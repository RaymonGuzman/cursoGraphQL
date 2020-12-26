import React, { Fragment } from 'react';
import Layout from '../components/Layout';

const nuevaCuenta = () => {
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-center text-white font-light"> Login </h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="nombre"
                >
                  Nombre
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                  id="nombre"
                  type="text"
                  placeholder="Nombre de Usuario"
                ></input>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="apellido"
                >
                  Apellido
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                  id="apellido"
                  type="text"
                  placeholder="Apellido del Usuario"
                ></input>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email Usuario"
                ></input>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password Usuario"
                ></input>
              </div>

              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 text-white uppercase hover:bg-gray-600"
                value="Crear Usuario"
              ></input>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default nuevaCuenta;
