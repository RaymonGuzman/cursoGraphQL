import Layout from '../components/Layout';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

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
  const { data, loading, error, client } = useQuery(CLIENTES_VENDEDOR);
  console.log(data);

  if (loading) return <p>Cargando...</p>;

  if (!data) {
    if (!data.obtenerClienteVendedor) {
      client.clearStore();
      router.push('/login');
      return <p>Loading...</p>;
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light"> Clientes </h1>

      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/3 py-2">Nombre</th>
            <th className="w-2/3 py-2">Empresa</th>
            <th className="w-1/3 py-2">Email</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.obtenerClienteVendedor.map((cliente) => (
            <tr key={cliente.id}>
              <td className="border px-4 py-2 border-gray-300">
                {cliente.nombre} {cliente.apellido}
              </td>
              <td className="border px-4 py-2 border-gray-300">
                {cliente.empresa}
              </td>
              <td className="border px-4 py-2 border-gray-300">
                {cliente.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
