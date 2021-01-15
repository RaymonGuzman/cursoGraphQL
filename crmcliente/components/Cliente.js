import React from 'react';

const Cliente = ({ cliente }) => {
  const { id, nombre, apellido, empresa, email } = cliente;

  const eliminarCliente = ({ id }) => {
    console.log(id);
  };
  return (
    <>
      <td className="border px-4 py-2 border-gray-300">
        {nombre} {apellido}
      </td>
      <td className="border px-4 py-2 border-gray-300">{empresa}</td>
      <td className="border px-4 py-2 border-gray-300">{email}</td>
      <td className="border px-5 py-2 border-gray-300">
        <button
          className="flex justifiy-center items-center m-3 bg-red-600 text-white font-bold px-4 py-1 rounded hover:bg-red-800"
          onClick={() => eliminarCliente({ id })}
        >
          Eliminar
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
            />
          </svg>
        </button>
      </td>
    </>
  );
};

export default Cliente;
<svg
  className="w-6 h-6"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
  />
</svg>;
