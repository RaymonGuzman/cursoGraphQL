import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const options = [
  { id: 'chocolate', nombre: 'Chocolate' },
  { id: 'strawberry', nombre: 'Strawberry' },
  { id: 'vanilla', nombre: 'Vanilla' },
];
const AsignarCliente = () => {

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
      console.log(pedidos);
    }, [pedidos]);
  
    const seleccionarSabores = (sabores) => {
      setPedidos(sabores);
    };

    return (  

        <Select
          options={options}
          isMulti={true}
          onChange={(opcion) => seleccionarSabores(opcion)}
          getOptionValue={opciones=> opciones.id}
          getOptionLabel={opciones=>opciones.nombre}
        />    );
}
 
export default AsignarCliente;