import React from 'react';
import { Router, useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useMutation, useQuery, gql } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

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

const OBTENER_PRODUCTOS = gql`
  {
    obtenerProductos {
      id
      nombre
      modelo
      existencia
      precio
      creado
    }
  }
`;

const ACTUALIZAR_PRODUCTO = gql`
  mutation actualizarProducto($id: ID!, $input: ProductoInput) {
    actualizarProducto(id: $id, input: $input)
  }
`;
const actualizarproducto = () => {
  const { query } = useRouter();
  const route = useRouter();
  const { id } = query;

  const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
    variables: {
      id,
    },
  });

  const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO, {
    update(cache, { data: actualizarProducto }) {
      const { obtenerProductos } = cache.readQuery({
        query: OBTENER_PRODUCTOS,
      });

      if (obtenerProductos != null) {
        const productosActualizados = obtenerProductos.map((productos) =>
          productos.id === id ? actualizarProducto : productos
        );

        cache.writeQuery({
          query: OBTENER_PRODUCTOS,
          data: {
            obtenerProductos: productosActualizados,
          },
        });
      }

      // cache.writeQuery({
      //   query:OBTENER_PRODUCTO,
      //   variables: { id },
      //   data:{
      //     obtenerProducto: actualizarProducto
      //   }
      // });
    },
  });

  if (loading) return <p>Loading</p>;

  // const valuesFormik = data.obtenerProducto;
  const { obtenerProducto } = data;

  const formikSchema = Yup.object({
    nombre: Yup.string().required('Inserte el nombre del producto'),
    modelo: Yup.string(),
    existencia: Yup.number()
      .integer('La existencia deben ser numeros enteros')
      .positive('No se aceptan numeros negativos')
      // .min(1, 'la existenia debe ser mayor que 0')
      .required('Inserte la existencia del producto'),
    precio: Yup.number()
      .positive('No se aceptan numeros negativos')
      // .min(1, 'el precio debe ser mayor que 0')
      .required('Inserte el precio del producto'),
  });

  const editarProducto = async ({ values }) => {};

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={formikSchema}
            enableReinitialize
            initialValues={obtenerProducto}
            onSubmit={async (values) => {
              const { nombre, modelo, existencia, precio } = values;

              try {
                const { data } = await actualizarProducto({
                  variables: {
                    id,
                    input: {
                      nombre,
                      modelo,
                      existencia,
                      precio,
                    },
                  },
                });
                Swal.fire({
                  icon: 'success',
                  showConfirmButton: false,
                  // title: data.actualizarProducto,
                  title: 'Producto Actualizado Correctamente!',
                  timer: 2500,
                });

                setTimeout(() => {
                  route.push('/productos');
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    ></input>
                  </div>
                  {props.errors.modelo && props.touched.modelo && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.modelo}</p>
                    </div>
                  )}
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    ></input>
                  </div>
                  {props.errors.existencia && props.touched.existencia && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.existencia}</p>
                    </div>
                  )}
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    ></input>{' '}
                    $
                  </div>

                  {props.errors.precio && props.touched.precio && (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.precio}</p>
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

export default actualizarproducto;
