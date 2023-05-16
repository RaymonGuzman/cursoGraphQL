import React, { Fragment, useState } from "react";
import Layout from "../components/Layout";
// import { useFormik, Field } from 'formik';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
// import { route } from 'next/dist/next-server/server/router';

const NUEVA_CUENTA = gql`
  mutation nuevoUsuario($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      nombre
      apellido
      email
      rol
    }
  }
`;

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm font-bold">
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <select
        {...field}
        {...props}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
      />
      {meta.touched && meta.error ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 text-sm font-bold">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

const nuevaCuenta = () => {
  //State para guardar mensaje
  const [mensaje, guardarMensaje] = useState(null);
  const [error, setError] = useState(0);

  //Mutation para crear nueva usuario
  const [nuevoUsuario] = useMutation(NUEVA_CUENTA);

  //Declarando la constante router
  const router = useRouter();

  // Validación del formulario
  // const formik = useFormik({
  //   initialValues: {
  //     nombre: '',
  //     apellido: '',
  //     email: '',
  //     password: '',
  //     rol: '',
  //   },
  //   validationSchema: Yup.object({
  //     nombre: Yup.string()
  //                 .required('El Nombre es obligatorio'),
  //     apellido: Yup.string()
  //                 .required('El Apellido es obligatorio'),
  //     email: Yup.string()
  //                 .email('El email no es válido')
  //                 .required('El Email es obligatorio'),
  //     password: Yup.string()
  //                 .required('El Password es obligatorio')
  //                 .min(6, 'El Password debe al menos tener 6 caracteres'),
  //     rol: Yup.string()
  //                 .required('El Rol es obligatorio')
  //                 .min(6, 'El Password debe al menos tener 6 caracteres'),
  //   }),
  //   onSubmit: async (valores) => {
  //     // console.log(valores);
  //     const { nombre, apellido, email, password } = valores;

  //     try {
  //       const { data } = await nuevoUsuario({
  //         variables: {
  //           input: {
  //             nombre,
  //             apellido,
  //             email,
  //             password,
  //             rol,
  //           },
  //         },
  //       });

  //       console.log(data);
  //       console.log(data.nuevoUsuario.nombre);
  //       guardarMensaje(
  //         `Se ha creado un nuevo usuario con el nombre "${data.nuevoUsuario.nombre}"`
  //       );
  //       setTimeout(() => {
  //         router.push('/login');
  //       }, 5000);
  //     } catch (error) {
  //       guardarMensaje(error.message);
  //       setError(1);
  //       setTimeout(() => {
  //         guardarMensaje(null);
  //       }, 5000);
  //     }
  //   },
  // });

  const monstrarMensaje = () => {
    //Creando mensaje de error en rojo en caso de que el usuario esté registrado
    if (error == 1) {
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
    <Layout>
      <Formik
        initialValues={{
          nombre: "",
          apellido: "",
          email: "",
          password: "",
          rol: "",
        }}
        validationSchema={Yup.object({
          nombre: Yup.string().required("El Nombre es obligatorio"),
          apellido: Yup.string().required("El Apellido es obligatorio"),
          email: Yup.string()
            .email("El email no es válido")
            .required("El Email es obligatorio"),
          password: Yup.string()
            .required("El Password es obligatorio")
            .min(6, "El Password debe al menos tener 6 caracteres"),
          rol: Yup.string().required("El Rol es obligatorio"),
        })}
        /*  onSubmit={async (values) => {
          const { nombre, apellido, email, password, rol} = values;
          try {
            const { data } = await nuevoUsuario({
              variables: {
                input: {
                  nombre,
                  apellido, 
                  email,
                  password,
                  rol,
                }
              }
            })
          } catch (error) {
            console.log(error);
          }
        }} */
        onSubmit={(values, { setSubmitting }) => {
          const { nombre, apellido, email, password, rol } = values;
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
          // try {
          //   console.log(values);
          // } catch (error) {
          //   console.log(error);
          // }
        }}
      >
        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <Form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
              <MyTextInput
                label="Nombre"
                name="nombre"
                type="text"
                placeholder="Escriba el nombre"
              />
              <MyTextInput
                label="Apellido"
                name="apellido"
                type="text"
                placeholder="Escriba el apellido"
              />
              <MyTextInput
                label="Email"
                name="email"
                type="email"
                placeholder="Escriba el email"
              />
              <MyTextInput
                label="Password"
                name="password"
                type="password"
                placeholder="Escriba el password"
              />

              <MySelect label="Rol" name="rol">
                <option value="">Select a user rol</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </MySelect>

              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 py-2 text-white uppercase hover:bg-gray-600"
                // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value="Crear Usuario"
              ></input>
            </Form>
          </div>
        </div>
      </Formik>
    </Layout>
  );
};

export default nuevaCuenta;
