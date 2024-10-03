import React from 'react';

interface TableProps {
  names: string[];
  phoneNumbers: string[];
  messages: string[];
  macros: string[];
  disabledButtons: Set<number>;
  onSendWhatsAppMessage: (phoneNumber: string, name: string, message: string, index: number) => void;
}

const Table: React.FC<TableProps> = ({ names, phoneNumbers, messages,
  disabledButtons, onSendWhatsAppMessage }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
      <tr className="bg-gray-200 text-gray-800">
      <th className="p-3 hidden md:table-cell">Nombre</th>
          <th className="p-3 hidden md:table-cell">Teléfono</th>
          <th className="p-3 hidden md:table-cell">Mensaje</th>
          <th className="p-3 hidden md:table-cell">WhatsApp</th>
          <th className="p-3 block md:hidden">Acción</th>
        </tr>
      </thead>
      <tbody>
        {names.map((name, index) => (
          <tr 
            key={index} 
            className={`transition hover:bg-gray-200 text-gray-800 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          >
            <td className="p-3 hidden md:table-cell ">{name}</td>
            <td className="p-3 hidden md:table-cell">{phoneNumbers[index]}</td>
            <td className="p-3 hidden md:table-cell overflow-hidden text-ellipsis whitespace-nowrap" title={messages[index]}>
              {messages[index].length > 450 ? messages[index].substring(0, 450) + '...' : messages[index]}
            </td>
          
            <td className="p-3 hidden md:table-cell">
              <button 
                onClick={() => onSendWhatsAppMessage(phoneNumbers[index], name, messages[index], index)}
                className={`px-4 py-2 ${disabledButtons.has(index) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-400'} text-white rounded-full transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300`}
                disabled={disabledButtons.has(index)}
              >
                {disabledButtons.has(index) ? 'Enviado' : 'Enviar WhatsApp'}
              </button>
            </td>
            
            <td className="p-3 block md:hidden">
              <div className="flex flex-col space-y-2">
                <span className="block text-sm">{name}</span>
                <span className="block text-sm">{phoneNumbers[index]}</span>
                <button 
                  onClick={() => onSendWhatsAppMessage(phoneNumbers[index], name, messages[index], index)}
                  className={`px-4 py-2 ${disabledButtons.has(index) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-400'} text-white rounded-full transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300`}
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
  </div>
);

export default Table;
