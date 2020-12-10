const { gql } = require('apollo-server');
//Schema

const typeDefs = gql`
  type Query {
    #Usuarios
    obtenerUsuarioID(token: String!): Usuario

    #Productos
    obtenerProductos: [Producto]
    obtenerProducto(id: ID!): Producto

    #Clientes
    obtenerClientes: [Cliente]
    obtenerClienteVendedor: [Cliente]
    obtenerCliente(id: ID!): Cliente

    #Pedidos
    obtenerPedidos: [Pedido]
    obtenerPedidosVendedor: [Pedido]
    obtenerPedido(id: ID!): Pedido
  }

  #Usuario
  type Usuario {
    id: ID
    nombre: String
    apellido: String
    email: String
    creado: String
  }
  type Token {
    token: String
  }
  input UsuarioInput {
    nombre: String!
    apellido: String!
    email: String!
    password: String!
  }
  input AutenticarInput {
    email: String!
    password: String!
  }

  #Productos
  type Producto {
    id: ID
    nombre: String
    modelo: String
    existencia: Int
    precio: Float
    creado: String
  }

  input ProductoInput {
    nombre: String!
    modelo: String
    existencia: Int!
    precio: Float!
  }

  #Cliente
  type Cliente {
    id: ID
    nombre: String
    apellido: String
    empresa: String
    email: String
    telefono: String
    vendedor: ID
  }

  input ClienteInput {
    nombre: String!
    apellido: String!
    empresa: String!
    email: String!
    telefono: String!
  }

  input ClienteActualizacionInput {
    nombre: String
    apellido: String
    empresa: String
    email: String
    telefono: String
  }

  #Pedidos
  enum PedidoEstado {
    PENDIENTE
    PROCESADO
    RECHAZADO
  }
  type Pedido {
    id: ID
    pedido: [PedidoProducto]
    total: Float!
    cliente: ID!
    vendedor: ID!
    estado: PedidoEstado
    creado: String
  }

  type PedidoProducto {
    id: ID
    cantidad: Int
  }

  input PedidoInput {
    pedido: [PedidoProductoInput]
    total: Float!
    cliente: ID!
    estado: PedidoEstado
  }

  input PedidoProductoInput {
    id: ID
    cantidad: Int
  }

  type Mutation {
    #Usuario
    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token

    #Productos
    nuevoProducto(input: ProductoInput): Producto
    actualizarProducto(id: ID!, input: ProductoInput): Producto
    eliminarProducto(id: ID!): Producto

    #Clientes
    nuevoCliente(input: ClienteInput): Cliente
    actualizarCliente(id: ID!, input: ClienteActualizacionInput): Cliente
    eliminarCliente(id: ID!): Cliente

    #Pedidos
    nuevoPedido(input: PedidoInput): Pedido
    actualizarPedido(id:ID!, input: PedidoInput): String
  }
`;

module.exports = typeDefs;
