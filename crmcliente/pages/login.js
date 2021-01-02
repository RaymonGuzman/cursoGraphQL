import React, { Fragment, useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const LOGIN = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const login = () => {
  // Hooks para mostrar el mensaje de error
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(0);

  //Declarando la constante router
  const router = useRouter();

  const [autenticarUsuario] = useMutation(LOGIN);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('El email es obligatorio'),
      password: Yup.string()
        .required('El Password es obligatorio')
        .min(6, 'El Password debe al menos contener 6 caracteres'),
    }),
    onSubmit: async (valores) => {
      const { email, password } = valores;

      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email,
              password,
            },
          },
        });

        // Guardamos el token en localStorage
        const { token } = data.autenticarUsuario;
        localStorage.setItem('token', token);
        setMensaje('Autenticando usuario, espere un momento por favor...');
        setTimeout(() => {
          // setMensaje(null);
          router.push('/');
        }, 3000);
        console.log(data);
      } catch (error) {
        console.log(error.message);
        setMensaje(error.message);
        setError(1);
        setTimeout(() => {
          setMensaje(null);
          setError(0);
        }, 5000);
      }
    },
  });

  const mostrarMensaje = () => {
    if (error === 1) {
      return (
        <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center text-red-600 mx-auto">
          <p> {mensaje} </p>
        </div>
      );
    }

    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p> {mensaje} </p>
      </div>
    );
  };

  return (
    <div>
      <Layout>
        {mensaje && mostrarMensaje()}

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
                value="Iniciar Sesión"
              ></input>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default login;
