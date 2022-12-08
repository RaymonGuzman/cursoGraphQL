import React, { useState, useEffect } from 'react';
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

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];


const MejoresVendedores = () => {

    const { data, loading, error, startPolling, stopPolling } = useQuery(MEJORES_VENDEDORES);
    // console.log(data);

    useEffect( () => {
        startPolling(1000);
        return () => {
            stopPolling();
        }

    },[startPolling, stopPolling])

    console.log(loading);

    if (loading) return 'Cargando...'
    console.log(data);
    // console.log(error);

    const mejoresVendedores = [];

    data.obtenerMejoresVendedores.map((vendedores, index) => {
        // console.log(vendedores, index);
        // console.log(vendedores.total);
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