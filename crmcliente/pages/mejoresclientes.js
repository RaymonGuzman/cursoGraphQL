import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { gql, useQuery } from '@apollo/client';

const MEJORES_CLIENTES = gql`
    query mejoresClientes{
        obtenerMejoresClientes{
        cliente{
            nombre
            apellido
            empresa
            email
            telefono
        }
        total
        }
    }
`;

const MejoresClientes = () => {

    const { data, loading, error, startPolling, stopPolling } = useQuery(MEJORES_CLIENTES);

    useEffect( () => {
        startPolling(1000);
        return () => {
            stopPolling();
        }

    },[startPolling, stopPolling])

    console.log(loading);

    if (loading) return 'Cargando...'
    console.log(data);

    const mejoresClientes = [];

    data.obtenerMejoresClientes.map((cliente, index) => {
        mejoresClientes[index] = { ...cliente.cliente[0], nombre:cliente.cliente[0].nombre+' '+cliente.cliente[0].apellido, total: cliente.total }
    });

    console.log(mejoresClientes);

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800"> Mejores Clientes </h1>

            <ResponsiveContainer width="80%" height="60%">
                <BarChart
                    className="mt-10"
                    // width={500}
                    // height={300}
                    data={mejoresClientes}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#3182CE" />
                    {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                </BarChart>
            </ResponsiveContainer>
        </Layout>
    );
}

export default MejoresClientes;