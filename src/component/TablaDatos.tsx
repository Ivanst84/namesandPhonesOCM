import React from 'react';

interface TablaDatosProps {
  nombres: string[];
  telefonos: string[];
}

const TablaDatos: React.FC<TablaDatosProps> = ({ nombres, telefonos }) => {
  const maxLength = Math.max(nombres.length, telefonos.length);
  const rows = Array.from({ length: maxLength }, (_, i) => ({
    Nombre: nombres[i] || '',
    Telefono: telefonos[i] || '',
  }));

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.Nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.Telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaDatos;
