import React, { useReducer } from "react";
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer";

import {
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_PRODUCTOS,
  TOTAL_PEDIDOS
} from "../../types";

const PedidoState = ({ children }) => {
  const initialState = {
    cliente: {},
    productos: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(PedidoReducer, initialState);

  const asignarCliente = (clientes) => {
    // console.log(cliente);
    dispatch({
      type: SELECCIONAR_CLIENTE,
      payload: clientes
    })
  };

  const asignarProductos = (productos) => {
    let nuevoStateProductos;
    if ( state.productos.length > 0) {
      nuevoStateProductos = productos.map( producto => {
        const nuevoProducto = state.productos.find( productoState => producto.id === productoState.id )
        return { ...producto, ...nuevoProducto }
      })
    } else {
      nuevoStateProductos = productos
    }

    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: nuevoStateProductos
    })
  };

  const asignarProductoCantidad = (nuevoProducto) => {
    dispatch({
      type: CANTIDAD_PRODUCTOS,
      payload: nuevoProducto
    })
  };

  const pedidosTotal = () => {
    dispatch({
      type: TOTAL_PEDIDOS,
      // payload: nuevoProducto
    })
  };



  return (
    <PedidoContext.Provider
      value={{
        asignarCliente,
        asignarProductos,
        productos: state.productos,
        asignarProductoCantidad,
        pedidosTotal,
        total: state.total,
        cliente: state.cliente
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};

export default PedidoState;
