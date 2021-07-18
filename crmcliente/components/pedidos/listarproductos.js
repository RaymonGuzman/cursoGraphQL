import React, { useContext } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';
import DetalleProducto from './detalleproducto';

const listarProductos = () => {
  const context = useContext(PedidoContext);
  const { productos } = context;
  return (
    <>
      <p className="mt-10 my-2 bg-white  border-l-4 border-gray-800 p-2 text-sm font-bold">3.Seleccione la cantidad de productos</p>
      { 
      productos.length>0 ? ( 
        
        productos.map(producto=>(
          <DetalleProducto
            key={producto.id}
            producto={producto}
          />
        ))
      ) : (
          <p className="mt-5 text-sm">No hay productos seleccionados</p> 
          )
      }
    </>

  );
}
 
export default listarProductos;