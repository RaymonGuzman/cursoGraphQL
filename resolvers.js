const Usuario = require('./model/Usuario');
const Producto = require('./model/Productos');
const Cliente = require('./model/Clientes');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Clientes = require('./model/Clientes');
require('dotenv').config({ path: 'variables.env' });


const crearToken = (usuario, palabra, expiresIn) => {
  const { id, email, nombre, apellido } = usuario;
  return jwt.sign({ id }, palabra, { expiresIn });
}
// Resolvers
const resolvers = {
  Query: {
    // Usuarios
    obtenerUsuarioID: async (_, { token }) => {
      const UsuarioId = await jwt.verify(token, process.env.PALABRA);
      console.log(UsuarioId);
      return UsuarioId

    },

    // Productos
    obtenerProductos: async () => {
      try {
        const productos = await Producto.find();
        return productos;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerProducto: async (_, { id }) => {
      const productoID = await Producto.findById(id);
      if (!productoID) {
        throw new Error('No existe el producto');
      }

      return productoID

    },

    // Clientes
    obtenerClientes: async () => {
      try {
        const clientes = await Clientes.find({});
        return clientes;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerClienteVendedor: async (_, __, ctx) => {
      console.log(ctx.usuario.id);
      const vendedorID = ctx.usuario.id.toString();
      if (vendedorID) {
        try {
          const clientes = await Clientes.find({ vendedor: vendedorID })
          if (clientes.length == 0) {
            throw new Error('No existen clientes para este vendedor');
          }
          return clientes
        } catch (error) {
          console.log(error);
        }
      }
    },

    obtenerCliente: async (_, { id }, ctx) => {
      const cliente = await Cliente.findById(id);
      if (!cliente) {
        throw new Error('No existe cliente con este ID');
      }
      if (cliente.vendedor.toString() !== ctx.usuario.id) {
        throw new Error('Este cliente no pertenece a usted');
      }
      return cliente;
    },
  },

  Mutation: {

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
    },

    // Productos
    nuevoProducto: async (_, { input }) => {
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
    actualizarProducto: async (_, { id, input }) => {

      let producto = await Producto.findById(id);
      if (!producto) {
        throw new Error('No existe el producto');
      }

      producto = Producto.findByIdAndUpdate({ _id: id }, input, { new: true });

      return producto;

    },
    eliminarProducto: async (_, { id }) => {
      let producto = await Producto.findById(id);
      if (!producto) {
        throw new Error('No existe el producto');
      }

      producto = await Producto.findByIdAndDelete({ _id: id });

      return producto;
    },

    // Clientes
    nuevoCliente: async (_, { input }, ctx) => {
      const { email } = input;
      //Revisar si ya hay un usuario registrado
      const existeCliente = await Cliente.findOne({ email });
      if (existeCliente) {
        throw new Error('El cliente ya está registrado');
      }
      const cliente = await new Cliente(input);
      cliente.vendedor = ctx.usuario.id;
      cliente.save();

      return cliente;
    },

    actualizarCliente: async (_, { id, input }, ctx) => {
      const cliente = await Cliente.findById(id);
      if (!cliente) {
        throw new Error('No existe cliente con este ID');
      }
      if (cliente.vendedor.toString() !== ctx.usuario.id) {
        throw new Error('Este cliente no pertenece a usted');
      }
      const clienteActualizado = await Cliente.findByIdAndUpdate(id, input, { new: true });
      return clienteActualizado;
    },
    eliminarCliente: async (_, { id }, ctx) => {
      const cliente = await Cliente.findById(id);
      if (!cliente) {
        throw new Error('No existe cliente con este ID');
      }
      if (cliente.vendedor.toString() !== ctx.usuario.id) {
        throw new Error('Este cliente no pertenece a usted');
      }
      const eliminarCliente = Cliente.findByIdAndDelete(id);

      return eliminarCliente;
    }
  }
}

module.exports = resolvers;
