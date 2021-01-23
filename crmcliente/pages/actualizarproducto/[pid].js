import React from 'react';
import { Router, useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useMutation, useQuery, gql } from '@apollo/client';
import { Formik } from 'formik';

const OBTENER_PRODUCTO = gql`
  query obtenerProducto($id: ID!) {
    obtenerProducto(id: $id) {
      id
      nombre
      existencia
      precio
    }
  }
`;
const actualizarproducto = () => {
  const { query } = useRouter();
  const { id } = query;
  const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
    variables: {
      id,
    },
  });
  if (loading) return <p>Loading</p>;

  const valuesFormik = data.obtenerProducto;
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <Formik initialValues={valuesFormik}>
            {(props) => {
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  //   onSubmit={formik.handleSubmit}
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
                      placeholder="Nombre del producto"
                      value={props.values.nombre}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
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
                      htmlFor="modelo"
                    >
                      Modelo
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                      id="modelo"
                      type="text"
                      placeholder="Modelo del producto"
                      value={props.values.modelo}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
                    ></input>
                  </div>
                  {/* {formik.errors.modelo && formik.touched.modelo && (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.modelo}</p>
                  </div>
                )} */}
                  {/*  */}
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="existencia"
                    >
                      Existencia
                    </label>
                    <input
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                      id="existencia"
                      type="number"
                      placeholder="Existencia del producto"
                      value={props.values.existencia}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
                    ></input>
                  </div>
                  {/* {formik.errors.existencia && formik.touched.existencia && (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.existencia}</p>
                  </div>
                )} */}
                  {/*  */}
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="precio"
                    >
                      Precio
                    </label>
                    <input
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                      id="precio"
                      type="number"
                      placeholder="Precio del producto"
                      value={props.values.precio}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
                    ></input>{' '}
                    $
                  </div>

                  {/* {formik.errors.precio && formik.touched.precio && (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.precio}</p>
                  </div>
                )} */}

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 py-2 text-white uppercase hover:bg-gray-600"
                    value="Crear Producto"
                  ></input>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default actualizarproducto;
