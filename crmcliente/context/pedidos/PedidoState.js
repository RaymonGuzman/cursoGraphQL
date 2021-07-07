import React, { useReducer } from "react";
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer";

import {
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_PRODUCTOS,
} from "../../types";

const PedidoState = ({children}) => {
  const initialState = {
    cliente: [],
    productos: [],
    total: 0,
  };

  const prueba = () => {
    console.log("Constante de Prueba");
  };

  const [state, dispatch] = useReducer(PedidoReducer, initialState);
  return (
    <PedidoContext.Provider
      value={{
        prueba,
        total: state.total
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
  // return ('HOla');
};

export default PedidoState;
