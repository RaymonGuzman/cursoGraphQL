const Usuario = require('./model/Usuario');
const bcryptjs = require('bcryptjs');
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
      console.log(input.password);

      //Hashear password
      //podemos usar genSaltSync para así no tener que llamar a await
      const salt = await bcryptjs.genSalt(10);
      //podemos usar hashSync para así no tener que llamar a await
      input.password = await bcryptjs.hash(password, salt.toString());

      try {
        const usuario = new Usuario(input);
        usuario.save();
        return usuario;
      } catch (error) {
        console.log(error);
      }
      //hashear el passowrd
      console.log(existeUsuario);
    },
    autenticarUsuario: async (_, { input }) => {

      const { email, password } = input;
      const existeUsuario = await Usuario.findOne({ email });

      //Verificamos si el usuario existe
      if (!existeUsuario) {
        throw new Error('No existe usuario')
      };
      const passwordCorrecta = await bcryptjs.compare(password, existeUsuario.password);

      if (passwordCorrecta) {
        console.log('Autenticado');
      } else {
        console.log('No autenticado');
      }
    }
  }
}

module.exports = resolvers;