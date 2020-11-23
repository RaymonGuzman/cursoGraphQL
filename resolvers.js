const Usuario = require('./model/Usuario');
// Resolvers

const resolvers = {
  Query: {
    obtenerCursos: () => "obtener algo para que no explote"
  },
  Mutation: {
    nuevoUsuario: async (_, { input }) => {

      const { email, password } = input;

      //Revisar si ya hay un usuario registrado
      const existeUsuario = await Usuario.findOne({ email });
      if (existeUsuario) {
        throw new Error('El usuario ya está registrado');
      }

      try {
        const usuario = new Usuario(input);
        usuario.save();
        return usuario;
      } catch (error) {
        console.log(error);
      }
      //hashear el passowrd
      console.log(existeUsuario);
    }
  }
}

module.exports = resolvers;