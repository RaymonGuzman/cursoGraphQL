import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const clientes = [
  { id: 1, nombre: 'Pedro' },
  { id: 2, nombre: 'Iralio Cruz' },
  { id: 3, nombre: 'Pedro Bautista' },
];
const AsignarCliente = () => {

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
      console.log(pedidos);
    }, [pedidos]);
  
    const seleccionarClientes = (cliente) => {
      setPedidos(cliente);
    };

    return (  

        <Select
          options={clientes}
          isMulti={true}
          onChange={(opcion) => seleccionarClientes(opcion)}
          getOptionValue={opciones=> opciones.id}
          getOptionLabel={opciones=>opciones.nombre}
        />    );
}
 
export default AsignarCliente;