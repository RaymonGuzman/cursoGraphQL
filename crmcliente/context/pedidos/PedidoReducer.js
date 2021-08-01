import {
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_PRODUCTOS,
  TOTAL_PEDIDOS
} from "../../types";

const PedidoReducer =  (state, action) => {
  switch (action.type) {
    case SELECCIONAR_CLIENTE:
      return {
        ...state,
        cliente: action.payload
      };

    case SELECCIONAR_PRODUCTO:
      return {
        ...state,
        productos: action.payload
      };

    case CANTIDAD_PRODUCTOS:
      return {
        ...state,
        productos: state.productos.map(producto => (producto.id === action.payload.id ? producto=action.payload : producto))
      };

    case TOTAL_PEDIDOS:
      return {
        ...state,
        total: state.productos.reduce ( (acucumulator, producto) => ( acucumulator + producto.precio * producto.cantidad ), 0 )
      };

    default:
      return state;
  }
}

export default PedidoReducer;