const { gql } = require("apollo-server");
//Schema

const typeDefs = gql`
  type Curso {
    titulo: String
    tecnologia: String
  }
  input tecnologiaInput {
    tecnologia: String
  }
  # type Tecnologia {
  #     tecnologia: String
  # }
  type Query {
    obtenerCursos(input: tecnologiaInput!): [Curso]
    # obtenerTecnologia: [Tecnologia]
  }
`;

module.exports = typeDefs;
