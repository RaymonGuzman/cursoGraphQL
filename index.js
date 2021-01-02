const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const conectarDB = require('./db');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

//Conectar a la Database
conectarDB();

//servidor
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // console.log(req.headers);

    const token = req.headers['authorization'] || '';
    if (token) {
      try {
        const usuario = jwt.verify(token, process.env.PALABRA);
        // console.log(usuario);
        return {
          usuario,
        };
      } catch (error) {
        console.log(error);
        // throw new Error(error)
      }
    }
  },
});

//arrancar el servidir
server.listen().then(({ url }) => {
  console.log(`Servidor corriendo en la URL ${url}`);
});
