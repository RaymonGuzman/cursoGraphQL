import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos{
      id
      nombre
      modelo
      existencia
      precio
      creado
    }
  }
`;

const AsignarCliente = () => {
  const [producto, setProducto] = useState([]);
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);
  const context = useContext(PedidoContext);
  const { asignarProductos } = context;
  
  loading && <p>Loading ...</p>;
  const obtenerProductos = data?.obtenerProductos;
  useEffect(() => {
    asignarProductos(producto);
  }, [producto]);

  const seleccionarProducto = (producto) => {
    setProducto(producto);
  };

  return (
    <>
      <p className="mt-10 my-2 bg-white  border-l-4 border-gray-800 p-2 text-sm font-bold">2.Seleccione el/los productos</p>
      <Select
        options={obtenerProductos}
        isMulti={true}
        onChange={(producto) => seleccionarProducto(producto)}
        getOptionValue={opciones => opciones.id}
        getOptionLabel={opciones => `${opciones.nombre} - ${opciones.existencia} Disponibles`}
      />
    </>
  );
}

export default AsignarCliente;