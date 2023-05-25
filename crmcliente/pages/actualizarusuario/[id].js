import React from 'react';
import { Router, useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useMutation, useQuery, gql } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const OBTENER_USUARIO = gql`
  query obtenerUsuario($id: ID!) {
    obtenerUsuario(id: $id) {
      id
      nombre
      apellido
      email
      rol
    }
  }
`;

const OBTENER_USUARIOS = gql`
  {
    obtenerUsuarios {
      id
      nombre
      apellido
      email
      rol
    }
  }
`;

const ACTUALIZAR_USUARIO = gql`
  mutation actualizarUsuario($id: ID!, $input: UsuarioActualizacionInput) {
    actualizarUsuario(id: $id, input: $input){
      id
      nombre
      apellido
      email
      rol
    }
  }
`;
const actualizarusuario = () => {
  const { query } = useRouter();
  const route = useRouter();
  const { id } = query;

  // console.log(id);

  // const [editarUsuario] = useMutation(ACTUALIZAR_USUARIO);

  const { data, loading, error } = useQuery(OBTENER_USUARIO, {
    variables: {
      id,
    },
  });

  // if (loading) return "Loading";


  const [editarUsuario] = useMutation(ACTUALIZAR_USUARIO, {
    update(cache, { data: editarUsuario }) {
      const { obtenerUsuarios } = cache.readQuery({
        query: OBTENER_USUARIOS,
      });

      if (obtenerUsuarios != null) {
        const usuariosActualizados = obtenerUsuarios.map((usuario) =>
          usuario.id === id ? editarUsuario : usuario
        );

        cache.writeQuery({
          query: OBTENER_USUARIOS,
          data: {
            obtenerUsuarios: usuariosActualizados,
          },
        });
      }

      cache.writeQuery({
        query: OBTENER_USUARIO,
        variables: { id },
        data: {
          obtenerUsuario: editarUsuario
        }
      });
    },
  });

  if (loading) return <p>Loading</p>;

  // const valuesFormik = data.obtenerProducto;
  // console.log(error);


  const formikSchema = Yup.object({
    nombre: Yup.string().required('Inserte el nombre del usuario'),
    apellido: Yup.string().required('Inserte el nombre del aellido'),
    email: Yup.string()
      // .min(1, 'la existenia debe ser mayor que 0')
      .required('Inserte el email'),
    rol: Yup.string()
      // .positive('No se aceptan numeros negativos')
      // .min(1, 'el precio debe ser mayor que 0')
      .required('Inserte el rol'),
  });

  // const editarProducto = async ({ values }) => {};
  const { obtenerUsuario } = data;

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={formikSchema}
            enableReinitialize
            initialValues={obtenerUsuario}
            onSubmit={async (values) => {
              const { nombre, apellido, email, rol } = values;

              try {
                const { data } = await editarUsuario({
                  variables: {
                    id,
                    input: {
                      nombre,
                      apellido,
                      email,
                      rol,
                    },
                  },
                });
                Swal.fire({
                  icon: 'success',
                  showConfirmButton: false,
                  // title: data.actualizarProducto,
                  title: 'Usuario Actualizado Correctamente!',
                  timer: 2500,
                });

                setTimeout(() => {
                  route.push('/usuarios');
                }, 3000);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {(props) => {
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
                      placeholder="Nombre del producto"
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
                      placeholder="Apellido del producto"
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
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Email del producto"
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
                      htmlFor="rol"
                    >
                      rol
                    </label>
                    <input
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                      id="rol"
                      type="text"
                      placeholder="Rol del producto"
                      value={props.values.rol}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    ></input>{' '}
                    $
                  </div>

                  {props.errors.rol && props.touched.rol && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.rol}</p>
                    </div>
                  )}

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 py-2 text-white uppercase hover:bg-gray-600"
                    value="Actualizar Producto"
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

export default actualizarusuario;
