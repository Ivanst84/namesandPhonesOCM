import React from 'react';

interface TitleProps {
  mensaje: string;
}

const Title: React.FC<TitleProps> = ({ mensaje }) => {
  return (
    <h1 className="text-4xl font-bold text-gray-100 mb-6 text-center shadow-neonWhite animate-pulse">
      {mensaje}
    </h1>
  );
};

export default Title;
