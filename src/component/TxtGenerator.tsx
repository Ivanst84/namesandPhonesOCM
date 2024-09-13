import React from 'react';
import { generateTxt } from '@/util/generateTxt';
interface TxtGeneratorProps {
  
  phoneNumbers: string[];
 
  onClear: () => void;
}

const TxtGenerator: React.FC<TxtGeneratorProps> = ({  phoneNumbers,onClear }) => {
  const handleGenerateTxt = () => {
    generateTxt(phoneNumbers);
    onClear();
  };

  return (
    <button 
      onClick={handleGenerateTxt} 
      className="mt-6 px-4 py-2 bg-gray-700 text-gray-100 rounded hover:bg-gray-600 transition"
    >
      Generar Archivo TXT
    </button>
  );
};

export default TxtGenerator;
