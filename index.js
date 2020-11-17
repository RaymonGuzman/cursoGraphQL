const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');



//servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        const context = "Context";
        return { context }
    }

});


//arrancar el servidir
server.listen().then(({ url }) => {
    console.log(`Servidor corriendo en la URL ${url}`);
})