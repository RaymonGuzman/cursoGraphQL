import React from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const NUEVO_PRODUCTO = gql`
  mutation nuevoProducto($input: ProductoInput) {
    nuevoProducto(input: $input)
  }
`;

const nuevosproductos = () => {
  const router = useRouter();

  const [nuevoProducto] = useMutation(NUEVO_PRODUCTO);

  const formik = useFormik({
    initialValues: {
      nombre: '',
      modelo: '',
      existencia: 0,
      precio: 0,
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('Inserte el nombre del producto'),
      modelo: Yup.string(),
      existencia: Yup.number()
        .min(1, 'la existenia debe ser mayor que 0')
        .required('Inserte la existencia del producto'),
      precio: Yup.number()
        .min(1, 'el precio debe ser mayor que 0')
        .required('Inserte el precio del producto'),
    }),
    onSubmit: async (values) => {
      // console.log(values);
      const { nombre, modelo, existencia, precio } = values;
      try {
        const { data } = await nuevoProducto({
          variables: {
            input: {
              nombre,
              modelo,
              existencia,
              precio,
            },
          },
        });
        console.log(data);
        Swal.fire({
          icon: 'success',
          showConfirmButton: false,
          title: data.nuevoProducto,
          timer: 2500,
        });
        router.push('/productos');
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Layout>
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
                placeholder="Nombre del producto"
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
                htmlFor="modelo"
              >
                Modelo
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                id="modelo"
                type="text"
                placeholder="Modelo del producto"
                value={formik.values.modelo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>
            {formik.errors.modelo && formik.touched.modelo && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                <p className="font-bold">Error</p>
                <p>{formik.errors.modelo}</p>
              </div>
            )}
            {/*  */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="empresa"
              >
                Existencia
              </label>
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                id="existencia"
                type="number"
                placeholder="Existencia del producto"
                value={formik.values.existencia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
            </div>
            {formik.errors.existencia && formik.touched.existencia && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                <p className="font-bold">Error</p>
                <p>{formik.errors.existencia}</p>
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
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>{' '}
              $
            </div>

            {formik.errors.precio && formik.touched.precio && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm">
                <p className="font-bold">Error</p>
                <p>{formik.errors.precio}</p>
              </div>
            )}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 py-2 text-white uppercase hover:bg-gray-600"
              value="Crear Producto"
            ></input>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default nuevosproductos;
