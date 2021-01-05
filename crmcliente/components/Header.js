import React from 'react';
import { useQuery, gql } from '@apollo/client';

const OBTENER_USUARIO = gql`
  {
    obtenerUsuario {
      id
      nombre
      apellido
      email
    }
  }
`;

const Header = () => {
  const { data, loading, error } = useQuery(OBTENER_USUARIO);

  const { nombre, apellido } = data.obtenerUsuario;
  if (loading) return 'Cargando...';

  return (
    <div className="flex justify-between mb-6">
      <p className="mr-2">
        Hola {nombre} {apellido}
      </p>
      <button type="button">Cerrar Sesion</button>
    </div>
  );
};

export default Header;
