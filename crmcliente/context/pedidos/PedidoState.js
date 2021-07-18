import React, { useReducer } from "react";
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer";

import {
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_PRODUCTOS,
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
    // console.log(productos);
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: productos
    })
  };



  return (
    <PedidoContext.Provider
      value={{
        asignarCliente, asignarProductos, productos: state.productos
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};

export default PedidoState;
