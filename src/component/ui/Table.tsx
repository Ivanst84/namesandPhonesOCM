import React, { useState } from 'react';

interface TableProps {
  names: string[];
  phoneNumbers: string[];
  messages: string[];
  disabledButtons: Set<number>;
  captureType: "both" | "phoneOnly";
  onSendWhatsAppMessage: (phoneNumber: string, name: string, message: string, index: number) => void;
}

const Table: React.FC<TableProps> = ({ names, phoneNumbers, messages, disabledButtons, captureType, onSendWhatsAppMessage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10); // 🔥 Puedes cambiar la cantidad de registros por página

  // Calcular el total de páginas
  const totalPages = Math.ceil(phoneNumbers.length / recordsPerPage);

  // Obtener los datos de la página actual
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = phoneNumbers.slice(indexOfFirstRecord, indexOfLastRecord);
  const currentNames = names.slice(indexOfFirstRecord, indexOfLastRecord);
  const currentMessages = messages.slice(indexOfFirstRecord, indexOfLastRecord);
 console.log("📊 Nombres actuales:", currentNames);
  console.log("📞 Teléfonos actuales:", currentRecords);
  return (
    <div className="overflow-x-auto">
      {/* 🔥 Total de capturas con estilo mejorado */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white text-center p-5 mb-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold flex items-center justify-center space-x-2">
          <span>📊 Capturas Realizadas</span>
        </h2>
        <p className="text-lg">
          <span className="font-semibold text-green-400">{phoneNumbers.length}</span> números capturados
        </p>
        {captureType === "both" && (
          <p className="text-lg">
            <span className="font-semibold text-blue-400">{names.length}</span> nombres capturados
          </p>
        )}
      </div>

      {/* 🔹 Selector de registros por página */}
      <div className="flex justify-between items-center mb-4">
        <label className="text-gray-700 font-semibold">
          Registros por página:
          <select
            className="ml-2 p-2 border rounded-lg bg-white text-gray-700"
            value={recordsPerPage}
            onChange={(e) => {
              setRecordsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reiniciar a la primera página al cambiar cantidad
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </label>
      </div>

      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg bg-white">
        <thead>
          <tr className="bg-gray-900 text-white uppercase text-sm tracking-wider">
            {captureType === "both" && <th className="p-4">Nombre</th>} 
            <th className="p-4">Teléfono</th>
            <th className="p-4">Mensaje</th>
            <th className="p-4">WhatsApp</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((phoneNumber, index) => (
            <tr 
              key={index} 
              className={`transition-all duration-300 hover:bg-gray-100 text-gray-800 ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              {captureType === "both" && <td className="p-4 font-semibold text-gray-700">{currentNames[index]}</td>}
              <td className="p-4 font-mono text-gray-800">{phoneNumber}</td>
              <td className="p-4 overflow-hidden text-ellipsis whitespace-nowrap" title={currentMessages[index]}>
                {currentMessages[index].length > 450 ? currentMessages[index].substring(0, 450) + '...' : currentMessages[index]}
              </td>
              <td className="p-4 text-center">
                <button 
                  onClick={() => onSendWhatsAppMessage(phoneNumber, currentNames[index] || "", currentMessages[index], index)}
                  className={`px-5 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 transform ${
                    disabledButtons.has(index) 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'bg-green-500 hover:bg-green-400 hover:scale-105 focus:ring-4 focus:ring-green-300'
                  }`}
                  disabled={disabledButtons.has(index)}
                >
                  {disabledButtons.has(index) ? '✅ Enviado' : '📩 Enviar WhatsApp'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 Controles de paginación */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-400 text-white'
          }`}
        >
          ◀ Anterior
        </button>

        <p className="text-gray-800 font-semibold">
          Página {currentPage} de {totalPages}
        </p>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-400 text-white'
          }`}
        >
          Siguiente ▶
        </button>
      </div>
    </div>
  );
};

export default Table;
