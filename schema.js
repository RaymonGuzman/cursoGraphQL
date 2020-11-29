const { gql } = require("apollo-server");
//Schema

const typeDefs = gql`
  type Query {
    #Usuarios
    obtenerUsuarioID(token: String!): Usuario
    
    #Productos
    obtenerProductos: [Producto]
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
    id:ID
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

  type Mutation {
    #Productos
    nuevoProducto(input: ProductoInput): Producto
    #Usuario
    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token
  }
`;

module.exports = typeDefs;
