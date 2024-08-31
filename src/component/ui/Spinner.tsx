// Spinner.tsx
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; // Importa un spinner específico

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#ffffff" size={50} />
    </div>
  );
};

export default Spinner;
