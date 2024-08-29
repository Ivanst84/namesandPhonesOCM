import React from 'react';
import ExcelGenerator from './ExelGenerador';

interface DataTableProps {
  names: string[];
  phoneNumbers: string[];
  messages: string[];
  macros: string[];
  onGenerateExcel: () => void; // Callback para generar el archivo Excel
}

const TableData: React.FC<DataTableProps> = ({ names, phoneNumbers, messages, macros, onGenerateExcel }) => {
  // Asegúrate de que todos los arrays tengan la misma longitud
  const maxLength = Math.max(names.length, phoneNumbers.length, messages.length, macros.length);
  const finalNames = [...names, ...Array(maxLength - names.length).fill('')];
  const finalPhoneNumbers = [...phoneNumbers, ...Array(maxLength - phoneNumbers.length).fill('')];
  const finalMessages = [...messages, ...Array(maxLength - messages.length).fill('')];
  const finalMacros = [...macros, ...Array(maxLength - macros.length).fill('')];

  // Corrección: Usa el mensaje específico para la fila actual
  const sendWhatsAppMessage = (phoneNumber: string, name: string, message: string) => {
    const whatsappURL = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div>
      <table className="w-full text-left border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-600 p-2">Nombre</th>
            <th className="border border-gray-600 p-2">Teléfono</th>
            <th className="border border-gray-600 p-2">Mensaje</th>
            <th className="border border-gray-600 p-2">Macro</th>
            <th className="border border-gray-600 p-2">WhatsApp</th>
          </tr>
        </thead>
        <tbody>
          {finalNames.map((name, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
              <td className="border border-gray-600 p-2">{name}</td>
              <td className="border border-gray-600 p-2">{finalPhoneNumbers[index]}</td>
              <td className="border border-gray-600 p-2 overflow-hidden text-ellipsis whitespace-nowrap" title={finalMessages[index]}>
                {finalMessages[index].length > 50 ? finalMessages[index].substring(0, 50) + '...' : finalMessages[index]}
              </td>
              <td className="border border-gray-600 p-2 overflow-hidden text-ellipsis whitespace-nowrap" title={finalMacros[index]}>
                {finalMacros[index].length > 50 ? finalMacros[index].substring(0, 50) + '...' : finalMacros[index]}
              </td>
              <td className="border border-gray-600 p-2">
                <button 
                  onClick={() => sendWhatsAppMessage(finalPhoneNumbers[index], name, finalMessages[index])}
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-400 transition"
                >
                  Enviar WhatsApp
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6">
        <ExcelGenerator 
          names={finalNames} 
          phoneNumbers={finalPhoneNumbers} 
          messages={finalMessages}  
          macros={finalMacros}
          onClear={() => { /* Implementar una función para limpiar si es necesario */ }} 
        />
      </div>
    </div>
  );
};

export default TableData;
