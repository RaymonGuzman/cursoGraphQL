import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';

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

const AsignarCliente = () => {
  const [clienteSelect, setClienteSelect] = useState({});
  const { data, loading, error } = useQuery(CLIENTES_VENDEDOR);

  const context = useContext(PedidoContext);
  const { asignarCliente } = context;

  loading && <p>Loading ...</p>;
  const clientesVendedor = data?.obtenerClienteVendedor;
  useEffect(() => {
    asignarCliente(clienteSelect);
  }, [clienteSelect]);

  const seleccionarClientes = (cliente) => {
    setClienteSelect(cliente);
  };

  return (
    <>
      <p className="mt-10 my-2 bg-white  border-l-4 border-gray-800 p-2 text-sm font-bold">1.Seleccione el cliente</p>
      <Select
        options={clientesVendedor}
        // isMulti={true}
        onChange={(opcion) => seleccionarClientes(opcion)}
        getOptionValue={opciones => opciones.id}
        getOptionLabel={opciones => opciones.nombre + ' ' + opciones.apellido}
      />
    </>
  );
}

export default AsignarCliente;