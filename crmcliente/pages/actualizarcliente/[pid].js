import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useMutation, useQuery, gql } from '@apollo/client';

const OBTENER_CLIENTE = gql`
  query obtenerCliente($id: ID!) {
    obtenerCliente(id: $id) {
      id
      nombre
      apellido
      email
      empresa
      vendedor
    }
  }
`;

const actualizarcliente = () => {
  const { query } = useRouter();
  // console.log(query);
  const { id } = query;
  // console.log(id);

  const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
    variables: {
      id,
    },
  });

  if (loading) {
    return <p>Cargando...</p>;
  }

  console.log(data.obtenerCliente);

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            // onSubmit={formik.handleSubmit}
          >
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
                placeholder="Nombre del Cliente"
                // value={formik.values.nombre}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
              ></input>
            </div>
            {/*  */}
            {/* {formik.errors.nombre && formik.touched.nombre && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                <p className="font-bold">Error</p>
                <p>{formik.errors.nombre}</p>
              </div>
            )} */}
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
                placeholder="Apellido del Cliente"
                // value={formik.values.apellido}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
              ></input>
            </div>
            {/* {formik.errors.apellido && formik.touched.apellido && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                <p className="font-bold">Error</p>
                <p>{formik.errors.apellido}</p>
              </div>
            )} */}
            {/*  */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="empresa"
              >
                Empresa
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                id="empresa"
                type="text"
                placeholder="Empresa del Cliente"
                // value={formik.values.empresa}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
              ></input>
            </div>
            {/* {formik.errors.empresa && formik.touched.empresa && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                <p className="font-bold">Error</p>
                <p>{formik.errors.empresa}</p>
              </div>
            )} */}
            {/*  */}
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
                type="text"
                placeholder="Email del cliente"
                // value={formik.values.email}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
              ></input>
            </div>
            {/* {formik.errors.email && formik.touched.email && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                <p className="font-bold">Error</p>
                <p>{formik.errors.email}</p>
              </div>
            )} */}
            {/*  */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="telefono"
              >
                Telefono
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                id="telefono"
                type="text"
                placeholder="Telefono del cliente"
                // value={formik.values.telefono}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
              ></input>
            </div>
            {/* {formik.errors.telefono && formik.touched.telefono && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                <p className="font-bold">Error</p>
                <p>{formik.errors.telefono}</p>
              </div>
            )} */}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 py-2 text-white uppercase hover:bg-gray-600"
              value="Editar Cliente"
            ></input>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default actualizarcliente;
