import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { gql, useQuery } from '@apollo/client';

const MEJORES_VENDEDORES = gql`
    query mejoresVendedores{
        obtenerMejoresVendedores{
        vendedor{
            nombre
            apellido
            email
        }
        total
        }
    }
`;


const MejoresVendedores = () => {

    const { data, loading, error, startPolling, stopPolling } = useQuery(MEJORES_VENDEDORES);

    useEffect( () => {
        startPolling(1000);
        return () => {
            stopPolling();
        }

    },[startPolling, stopPolling])

    console.log(loading);

    if (loading) return 'Cargando...'
    console.log(data);

    const mejoresVendedores = [];

    data.obtenerMejoresVendedores.map((vendedores, index) => {
        mejoresVendedores[index] = { ...vendedores.vendedor[0], total: vendedores.total }
    });

    console.log(mejoresVendedores);

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800"> Mejores Vendedores </h1>

            <ResponsiveContainer width="80%" height="60%">
                <BarChart
                    className="mt-10"
                    // width={500}
                    // height={300}
                    data={mejoresVendedores}
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

export default MejoresVendedores;