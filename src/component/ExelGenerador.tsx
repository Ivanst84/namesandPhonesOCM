import React from 'react';
import { generateExcel } from '../util/generateExel';

interface ExcelGeneratorProps {
  names: string[];
  phoneNumbers: string[];
  messages :string[];
  macros : string [];
  onClear: () => void;
}

const ExcelGenerator: React.FC<ExcelGeneratorProps> = ({ names, phoneNumbers, messages,macros ,onClear }) => {
  const handleGenerateExcel = () => {
    generateExcel(names, phoneNumbers,messages,macros);
    onClear();
  };

  return (
    <button 
      onClick={handleGenerateExcel} 
      className="mt-6 px-4 py-2 bg-gray-700 text-gray-100 rounded hover:bg-gray-600 transition"
    >
      Generar Excel
    </button>
  );
};

export default ExcelGenerator;
