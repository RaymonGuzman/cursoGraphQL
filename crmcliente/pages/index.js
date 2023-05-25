import Layout from '../components/Layout';
import Cliente from '../components/Cliente';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CLIENTES_VENDEDOR = gql`
  query obtenerClienteVendedor {
    obtenerClienteVendedor {
      id
      nombre
      apellido
      empresa
      email
      vendedor
    }
  }
`;

export default function Home() {
  const router = useRouter();
  const { data, loading, error } = useQuery(CLIENTES_VENDEDOR);
  // console.log(data);

  if (loading) return <p>Cargando...</p>;
  // Quitando validación para que deje acceder al CMR cuando el cliente no tenga clientes asignados

  // if (!data?.obtenerClienteVendedor) {
  //   router.push('/login');
  //   return <p>Cargando...</p>;
  // }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800"> Clientes </h1>

      <Link href="/nuevosclientes">
        <a className="bg-gray-800 text-white px-3 py-2 mb-3 inline-block rounded font-bold text-sm shadow-md hover:bg-blue-500 w-full lg:w-auto text-center">
          Nuevos Clientes
        </a>
      </Link>
      {
        (!data?.obtenerClienteVendedor) ?
          <h1>El usuario actual aún no tiene ningún cliente asignado</h1>
          :
          <div className="overflow-x-scroll">
            <table className="table-auto shadow-md mt-10 w-full w-lg">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w-1/3 py-2">Nombre</th>
                  <th className="w-2/3 py-2">Empresa</th>
                  <th className="w-1/3 py-2">Email</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody className="bg-white">


                {data.obtenerClienteVendedor.map(
                  (cliente) => (
                    <tr key={cliente.id}>
                      <Cliente cliente={cliente} />
                    </tr>
                  )
                )
                }




              </tbody>
            </table>
          </div>
      }
    </Layout>
  );
}
