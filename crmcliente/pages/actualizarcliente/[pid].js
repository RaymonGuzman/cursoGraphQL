import React from 'react';
import { Router, useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useMutation, useQuery, gql } from '@apollo/client';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const OBTENER_CLIENTE = gql`
  query obtenerCliente($id: ID!) {
    obtenerCliente(id: $id) {
      id
      nombre
      apellido
      email
      telefono
      empresa
      vendedor
    }
  }
`;

const ACTUALIZAR_CLIENTE = gql`
  mutation actualizarCliente($id: ID!, $input: ClienteActualizacionInput) {
    actualizarCliente(id: $id, input: $input) {
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

const OBTENER_CLIENTES_VENDEDOR = gql`
  {
    obtenerClienteVendedor {
      id
      nombre
      empresa
      vendedor
    }
  }
`;

const actualizarcliente = () => {
  const { query } = useRouter();
  const route = useRouter();
  // console.log(query);
  const { id } = query;
  // console.log(id);

  const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
    variables: {
      id,
    },
  });

  const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE, {
    update(cache, { data: actualizarCliente }) {
      const { obtenerClienteVendedor } = cache.readQuery({
        query: OBTENER_CLIENTES_VENDEDOR,
      });

      const clientesActualizados = obtenerClienteVendedor.map((clientes) =>
        clientes.id === id ? actualizarCliente : clientes
      );

      cache.writeQuery({
        query: OBTENER_CLIENTES_VENDEDOR,
        data: {
          obtenerClienteVendedor: clientesActualizados,
        },
      });
    },
  });

  if (loading) {
    return <p>Cargando...</p>;
  }

  const infoActualizarCliente = async (valores) => {
    const { nombre, apellido, email, telefono, empresa } = valores;
    try {
      const { data } = await actualizarCliente({
        variables: {
          id,
          input: {
            nombre,
            apellido,
            email,
            telefono,
            empresa,
          },
        },
      });
      Swal.fire({
        icon: 'success',
        showConfirmButton: false,
        title: 'Cliente Actualizado Correctamente',
        timer: 2500,
      });

      setTimeout(() => {
        route.push('/');
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const schemaValidation = Yup.object({
    nombre: Yup.string().required('El Nombre es obligatorio'),
    apellido: Yup.string().required('El Apellido es obligatorio'),
    empresa: Yup.string().required('La Empresa es obligatoria'),
    email: Yup.string()
      .email('El email no es válido')
      .required('El Email es obligatorio'),
    telefono: Yup.string().required('El Telefono es obligatorio'),
  });

  // console.log(data.obtenerCliente);
  const { obtenerCliente } = data;
  // console.log(obtenerCliente);
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidation}
            enableReinitialize
            initialValues={obtenerCliente}
            onSubmit={(valores) => {
              infoActualizarCliente(valores);
            }}
          >
            {(props) => {
              // console.log(props);

              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
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
                      value={props.values.nombre}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    ></input>
                  </div>
                  {/*  */}
                  {props.errors.nombre && props.touched.nombre && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.nombre}</p>
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
                      value={props.values.apellido}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    ></input>
                  </div>
                  {props.errors.apellido && props.touched.apellido && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.apellido}</p>
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
                      value={props.values.empresa}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    ></input>
                  </div>
                  {props.errors.empresa && props.touched.empresa && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.empresa}</p>
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
                      value={props.values.email}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    ></input>
                  </div>
                  {props.errors.email && props.touched.email && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.email}</p>
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
                      value={props.values.telefono}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    ></input>
                  </div>
                  {props.errors.telefono && props.touched.telefono && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.telefono}</p>
                    </div>
                  )}

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 py-2 text-white uppercase hover:bg-gray-600"
                    value="Editar Cliente"
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

export default actualizarcliente;
