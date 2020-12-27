import React, { Fragment } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQuery, gql } from '@apollo/client';

const QUERY= gql`  {
  obtenerProductos{
    id
    nombre
    existencia
    precio
    creado
  }
}
`;

const nuevaCuenta = () => {

  //Realizando consulta de prueba

  const { data, loading, error } = useQuery(QUERY);
  console.log(loading);
  console.log(data);
  console.log(error);

  // Validación del formulario
  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
                    .required('El Nombre es obligatorio'),
      apellido: Yup.string().required('El Apellido es obligatorio'),
      email: Yup.string()
                    .email('El email no es válido')
                    .required('El Email es obligatorio'),
      password: Yup.string()
                    .required('El Password es obligatorio')
                    .min(6, 'El Password debe al menos tener 6 caracteres'),
    }),
    onSubmit: (valores) => {
      console.log(valores);
    },
  });

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-center text-white font-light"> Login </h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
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
                  placeholder="Nombre de Usuario"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
              </div>
              {formik.errors.nombre && formik.touched.nombre && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.nombre}</p>
                </div>
              )}
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
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
              </div>
              {formik.errors.apellido && formik.touched.apellido && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.apellido}</p>
                </div>
              )}
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
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
              </div>
              {formik.errors.email && formik.touched.email && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              )}
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
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
              </div>
              {formik.errors.password && formik.touched.password && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.password}</p>
                </div>
              )}

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
