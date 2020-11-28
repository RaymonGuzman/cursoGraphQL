const Usuario = require('./model/Usuario');
// const Producto = require('./model/Productos');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });


const crearToken = (usuario, palabra, expiresIn) => {
  const { id, email, nombre, apellido } = usuario;
  return jwt.sign({ id }, palabra, { expiresIn });
}
// Resolvers
const resolvers = {
  Query: {
    obtenerUsuarioID: async (_, { token }) => {
      const UsuarioId = await jwt.verify(token, process.env.PALABRA);
      console.log(UsuarioId);
      return UsuarioId

    }
  },
  Mutation: {
    // Productos
    nuevoProducto: async (_, { input }) => {
      // console.log(input);
      const { nombre, modelo, precio, existencia } = input;
      console.log(nombre);

      const existeProducto = await Producto.findOne({ nombre });
      if (existeProducto) {
        throw new Error('El producto ya está registrado');
      }
      try {
        const producto = new Producto(input);
        producto.save();
        return producto
      } catch (error) {
        console.log(error);
      }

    },

    // Usuarios
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
    },
    autenticarUsuario: async (_, { input }) => {

      const { email, password } = input;
      const existeUsuario = await Usuario.findOne({ email });

      //Verificamos si el usuario existe
      if (!existeUsuario) {
        throw new Error('No existe usuario')
      };
      const passwordCorrecta = await bcryptjs.compare(password, existeUsuario.password);

      if (!passwordCorrecta) {
        console.log('Clave Incorrecta');
        throw new Error('La contraseña es incorrecta');
      }
      return {
        token: crearToken(existeUsuario, process.env.PALABRA, '24h')
      }
    }
  }
}

module.exports = resolvers;
