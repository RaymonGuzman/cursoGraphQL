import React from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const NUEVO_CLIENTE = gql`
  mutation nuevoCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
      id
      nombre
      apellido
      empresa
      email
      telefono
      vendedor
    }
  }
`;

const CLIENTES_VENDEDOR = gql`
  query obtenerClienteVendedor {
    obtenerClienteVendedor {
      id
      nombre
      apellido
      empresa
      email
      vendedor
    }
  }
`;

const nuevosClientes = () => {
  // mutation para crear nuevos clientes
  const [nuevoCliente] = useMutation(NUEVO_CLIENTE, {
    update(cache, { data: { nuevoCliente } }) {
      // Obtener el objeto de cache que deseamos actualizar
      const { obtenerClienteVendedor } = cache.readQuery({
        query: CLIENTES_VENDEDOR
      });

      // Reescribimos el cache ( el cache nunca se debe modificar )
      cache.writeQuery({
        query: CLIENTES_VENDEDOR,
        data: {
          obtenerClienteVendedor: [...obtenerClienteVendedor, nuevoCliente],
        },
      });
    },
  });
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      empresa: '',
      email: '',
      telefono: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El Nombre es obligatorio'),
      apellido: Yup.string().required('El Apellido es obligatorio'),
      empresa: Yup.string().required('La Empresa es obligatoria'),
      email: Yup.string()
        .email('El email no es válido')
        .required('El Email es obligatorio'),
      telefono: Yup.string().required('El Telefono es obligatorio'),
    }),
    onSubmit: async (values) => {
      const { nombre, apellido, empresa, email, telefono } = values;

      try {
        const { data } = await nuevoCliente({
          variables: {
            input: {
              nombre,
              apellido,
              empresa,
              email,
              telefono,
            },
          },
        });

        router.push('/');
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Layout>
      <h1 className="text-2xl text-white text-center font-light">
        Nuevos Clientes
      </h1>
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
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
                placeholder="Nombre del Cliente"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>
            {/*  */}
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
                placeholder="Apellido del Cliente"
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
                value={formik.values.empresa}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>
            {formik.errors.empresa && formik.touched.empresa && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                <p className="font-bold">Error</p>
                <p>{formik.errors.empresa}</p>
              </div>
            )}
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
                value={formik.values.telefono}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>
            {formik.errors.telefono && formik.touched.telefono && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                <p className="font-bold">Error</p>
                <p>{formik.errors.telefono}</p>
              </div>
            )}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 text-white uppercase hover:bg-gray-600"
              value="Crear Cliente"
            ></input>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default nuevosClientes;
