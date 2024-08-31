import React from 'react';

interface TableProps {
  names: string[];
  phoneNumbers: string[];
  messages: string[];
  macros: string[];
  disabledButtons: Set<number>;
  onSendWhatsAppMessage: (phoneNumber: string, name: string, message: string, index: number) => void;
}

const Table: React.FC<TableProps> = ({ names, phoneNumbers, messages, macros, disabledButtons, onSendWhatsAppMessage }) => (
  <table className="w-full text-left border-collapse border border-gray-700">
    <thead>
      <tr className="bg-gray-800">
        <th className="border border-gray-600 p-2 hidden md:table-cell">Nombre</th>
        <th className="border border-gray-600 p-2 hidden md:table-cell">Teléfono</th>
        <th className="border border-gray-600 p-2 hidden md:table-cell">Mensaje</th>
        <th className="border border-gray-600 p-2 hidden md:table-cell">Macro</th>
        <th className="border border-gray-600 p-2 hidden md:table-cell">WhatsApp</th>
        <th className="border border-gray-600 p-2 block md:hidden">Acción</th>
      </tr>
    </thead>
    <tbody>
      {names.map((name, index) => (
        <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
          <td className="border border-gray-600 p-2 hidden md:table-cell">{name}</td>
          <td className="border border-gray-600 p-2 hidden md:table-cell">{phoneNumbers[index]}</td>
          <td className="border border-gray-600 p-2 hidden md:table-cell overflow-hidden text-ellipsis whitespace-nowrap" title={messages[index]}>
            {messages[index].length > 50 ? messages[index].substring(0, 50) + '...' : messages[index]}
          </td>
          <td className="border border-gray-600 p-2 hidden md:table-cell overflow-hidden text-ellipsis whitespace-nowrap" title={macros[index]}>
            {macros[index].length > 50 ? macros[index].substring(0, 50) + '...' : macros[index]}
          </td>
          <td className="border border-gray-600 p-2 hidden md:table-cell">
            <button 
              onClick={() => onSendWhatsAppMessage(phoneNumbers[index], name, messages[index], index)}
              className={`px-2 py-1 ${disabledButtons.has(index) ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-400'} text-white rounded transition`}
              disabled={disabledButtons.has(index)}
            >
              {disabledButtons.has(index) ? 'Enviado' : 'Enviar WhatsApp'}
            </button>
          </td>
          <td className="border border-gray-600 p-2 block md:hidden">
            <div className="flex flex-col">
              <span className="block mb-1">{name}</span>
              <span className="block mb-1">{phoneNumbers[index]}</span>
              <button 
                onClick={() => onSendWhatsAppMessage(phoneNumbers[index], name, messages[index], index)}
                className={`px-2 py-1 ${disabledButtons.has(index) ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-400'} text-white rounded transition`}
                disabled={disabledButtons.has(index)}
              >
                {disabledButtons.has(index) ? 'Enviado' : 'Enviar WhatsApp'}
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
