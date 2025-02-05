import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: "both" | "phoneOnly") => void;
}

const ModalComponent: React.FC<ModalProps> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  const handleSelect = (type: "both" | "phoneOnly") => {
    onSelect(type);  // Guarda la selección en el estado de OCRComponent.tsx
    onClose();        // Cierra el modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-lg font-semibold mb-4">Selecciona el tipo de captura</h2>
        <button 
          onClick={() => handleSelect("both")} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full mb-2"
        >
          Capturar Nombre y Teléfono
        </button>
        <button 
          onClick={() => handleSelect("phoneOnly")} 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full"
        >
          Capturar Solo Teléfono
        </button>
      </div>
    </div>
  );
};

export default ModalComponent;
