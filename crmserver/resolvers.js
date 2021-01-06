const Usuario = require('./model/Usuario');
const Producto = require('./model/Productos');
const Cliente = require('./model/Clientes');
const Pedido = require('./model/Pedidos');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Pedidos = require('./model/Pedidos');

require('dotenv').config({ path: 'variables.env' });

const crearToken = (usuario, palabra, expiresIn) => {
  const { id, email, nombre, apellido } = usuario;
  return jwt.sign({ id, nombre, apellido, email }, palabra, { expiresIn });
};
// Resolvers
const resolvers = {
  Query: {
    // Usuarios
    obtenerUsuarioToken: async (_, { token }) => {
      const UsuarioId = await jwt.verify(token, process.env.PALABRA);
      console.log(UsuarioId);
      return UsuarioId;
    },
    obtenerUsuario: async(_,__,ctx) => {
      return ctx.usuario;
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

      return productoID;
    },

    // Clientes
    obtenerClientes: async () => {
      try {
        const clientes = await Cliente.find({});
        return clientes;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerClienteVendedor: async (_, __, ctx) => {
      // console.log(ctx.usuario.id);
      const vendedorID = ctx.usuario.id.toString();
      if (vendedorID) {
        try {
          const clientes = await Cliente.find({ vendedor: vendedorID });
          if (clientes.length == 0) {
            throw new Error('No existen clientes para este vendedor');
          }
          return clientes;
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

    // Pedidos
    obtenerPedidos: async () => {
      try {
        const pedidos = await Pedido.find({});
        return pedidos;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerPedidosVendedor: async (_, __, ctx) => {
      const vendedorID = ctx.usuario.id;

      try {
        const pedidos = await Pedido.find({ vendedor: vendedorID });
        return pedidos;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerPedido: async (_, { id }, ctx) => {
      const vendedorID = ctx.usuario.id;

      const pedido = await Pedido.findById(id);

      if (!pedido) {
        throw new Error('El pedido no existe');
      }

      if (pedido.vendedor.toString() !== vendedorID) {
        throw new Error('Este pedido no le pertenece a usted');
      }

      return pedido;
    },
    obtenerPedidoEstado: async (_, { estado }, ctx) => {
      const vendedorID = ctx.usuario.id;

      try {
        const pedidos = await Pedido.find({
          estado: estado,
          vendedor: vendedorID,
        });
        if (pedidos.length == 0) {
          throw new Error(`No existen pedidos en el estado ${estado}`);
        }
        return pedidos;
      } catch (error) {
        throw new Error(error);
      }
    },
    obtenerMejoresClientes: async () => {
      const pedidos = Pedidos.aggregate([
        { $match: { estado: 'COMPLETADO' } },
        {
          $group: {
            _id: '$cliente', //Nombre del modelo
            total: { $sum: '$total' },
          },
        },
        {
          $lookup: {
            from: 'clientes',
            localField: '_id',
            foreignField: '_id',
            as: 'cliente',
          },
        },
        {
          $sort: { total: -1 },
        },
      ]);

      return pedidos;
    },

    obtenerMejoresVendedores: async () => {
      const vendedores = await Pedido.aggregate([
        { $match: { estado: 'COMPLETADO' } },
        {
          $group: {
            _id: '$vendedor',
            total: { $sum: '$total' },
          },
        },
        {
          $lookup: {
            from: 'usuarios',
            localField: '_id',
            foreignField: '_id',
            as: 'vendedor',
          },
        },
        {
          $limit: 3,
        },
        {
          $sort: { total: -1 },
        },
      ]);

      return vendedores;
    },
    buscarProducto: async (_, { texto }) => {
      const producto = await Producto.find({ $text: { $search: texto } });
      return producto;
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
        throw new Error('No existe usuario');
      }
      const passwordCorrecta = await bcryptjs.compare(
        password,
        existeUsuario.password
      );

      if (!passwordCorrecta) {
        console.log('Clave Incorrecta');
        throw new Error('La contraseña es incorrecta');
      }
      return {
        token: crearToken(existeUsuario, process.env.PALABRA, '24h'),
      };
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
        return producto;
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
      const clienteActualizado = await Cliente.findByIdAndUpdate(id, input, {
        new: true,
      });
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
    },

    //Pedidos
    nuevoPedido: async (_, { input }, ctx) => {
      const { cliente } = input;
      const clienteExiste = await Cliente.findById(cliente);

      if (!clienteExiste) {
        throw new Error('No existe cliente con este ID');
      }
      if (clienteExiste.vendedor.toString() !== ctx.usuario.id) {
        throw new Error('Este cliente no pertenece a usted');
      }

      for await (const pedido of input.pedido) {
        // console.log(pedido.id);
        const producto = await Producto.findById(pedido.id);
        pedido.vendedor = ctx.usuario.id;
        if (pedido.cantidad > producto.existencia) {
          throw new Error(
            `La cantidad en existencia del producto ${producto.nombre} es menor a la seleccionada`
          );
        } else {
          // Restar la cantidad que hay en existencia
          producto.existencia = producto.existencia - pedido.cantidad;
          await producto.save();
        }
      }

      const resultadoPedido = await new Pedido(input);

      // Asignarle el vendedor al pedido
      resultadoPedido.vendedor = ctx.usuario.id;

      await resultadoPedido.save();

      return resultadoPedido;
    },
    actualizarPedido: async (_, { id, input }, ctx) => {
      const vendedorID = ctx.usuario.id;

      const pedidoID = await Pedido.findById(id);

      if (!pedidoID) {
        throw new Error('El pedido no existe');
      }

      if (pedidoID.vendedor.toString() !== vendedorID) {
        throw new Error('Este pedido no le pertenece a usted');
      }

      for await (const pedido of input.pedido) {
        const producto = await Producto.findById(pedido.id);
        if (pedido.cantidad > producto.existencia) {
          throw new Error(
            `La cantidad en existencia del producto ${producto.nombre} es menor a la seleccionada`
          );
        } else {
          for await (const pedidoCreado of pedidoID.pedido) {
            if (pedido.id == pedidoCreado.id) {
              // console.log(producto.existencia);
              let restaurarProducto = producto.existencia;
              // Le sumamos la cantidad que le restamos en eso pedido ya creado para restaurarlo
              restaurarProducto += pedidoCreado.cantidad;
              // A continuación le restamos la nueva cantidad que ha de ser actualizada
              restaurarProducto -= pedido.cantidad;

              producto.existencia = restaurarProducto;
              await producto.save();
            }
          }
        }
      }
      resultadoPedido = await Pedido.findByIdAndUpdate({ _id: id }, input, {
        new: true,
      });
      return resultadoPedido;
    },
    eliminarPedido: async (_, { id }, ctx) => {
      // console.log(id);
      const vendedorID = ctx.usuario.id;

      const pedidoID = await Pedido.findById(id);
      // console.log(pedidoID);
      if (!pedidoID) {
        throw new Error('El pedido no existe');
      }

      if (pedidoID.vendedor.toString() !== vendedorID) {
        throw new Error('Este pedido no le pertenece a usted');
      }

      for await (const pedidoCreado of pedidoID.pedido) {
        const producto = await Producto.findById(pedidoCreado.id);
        producto.existencia += pedidoCreado.cantidad;

        await producto.save();
      }
      const resultado = await Pedido.findByIdAndDelete(id);
      return resultado;
    },
  },
};

module.exports = resolvers;
