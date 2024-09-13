"use client"
import React, { useState } from 'react';
import Title from './Title';
import ImageUploader from './ImageOCR/ImageUploader';
import { generateMessage } from '../util/generateMessage';
import EmojiPickerComponent from './Emojic/EmojiPicker';
import TableData from './TablaDatos';
import ImageProcessor from './ImageOCR/ImageProcessor';
import Logo from './Logo';
import { signOut } from 'next-auth/react';
const extractFirstName = (fullName: string) => {
  const nameParts = fullName.split(' ');
  return nameParts.length > 0 ? nameParts[0] : '';
};

const OCRComponent: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [names, setNames] = useState<string[]>([]);
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [messageType, setMessageType] = useState<string>('Nuevos');
  const [salesPersonName, setSalesPersonName] = useState<string>('');
  const [customMessage, setCustomMessage] = useState<string>(''); // Estado para el mensaje personalizado
  const [loading, setLoading] = useState<boolean>(false); // Estado para manejar el spinner
  const firstNames = names.map(extractFirstName);

  const salesPersonMessages = firstNames.map(name => 
    generateMessage(name, salesPersonName, messageType, customMessage) // Pasa el mensaje personalizado
  );

  const encodeMessage = (message: string) => {
    return encodeURIComponent(message);
  };

  const macros = firstNames.map((name, index) => 
    `="https://wa.me/${phoneNumbers[index]}?text=${encodeMessage(salesPersonMessages[index])}"`
  );

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleGenerateExcel = () => {
    console.log('Generando archivo Excel...');
  };


    const handleImageUpload = (files: File[]) => {
    setLoading(true); // Mostrar el spinner
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prevImages => prevImages.concat(imageUrls));
    setLoading(false); // Ocultar el spinner cuando se complete
  };


  const handleEmojiSelect = (emoji: string) => {
    const newMessage = customMessage + emoji;
    setCustomMessage(newMessage);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 space-y-6">
      {/* Botón de Logout */}
      <button
        onClick={async () => {
          await signOut();
          window.location.href = '/auth/signin';
        }}
        className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105"
      >
        Logout
      </button>
  
      {/* Logo */}
      <Logo />
  
      {/* Título */}
      <Title mensaje="Espartanos Web App v 1.0 Beta" />
  
      {/* Input para el nombre */}
      <input 
        type="text" 
        placeholder="Ingresa tu nombre" 
        value={salesPersonName}
        onChange={(e) => setSalesPersonName(e.target.value)} 
        className="p-3 bg-gray-800 text-white border border-gray-700 rounded-lg w-full max-w-md focus:outline-none focus:border-blue-500 transition-all"
      />
  
      {/* Selector de tipo de mensaje */}
      <select
        value={messageType}
        onChange={(e) => setMessageType(e.target.value)}
        className="p-3 bg-gray-800 text-white border border-gray-700 rounded-lg w-full max-w-md focus:outline-none focus:border-blue-500 transition-all"
      >
        <option value="Nuevos">Nuevos</option>
        <option value="Clientes">Clientes</option>
        <option value="Personalizado">Personalizado</option>
      </select>
  
      {/* Mensaje personalizado */}
      {messageType === 'Personalizado' && (
        <div className="relative w-full max-w-md">
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Ingresa tu mensaje personalizado aquí..."
            className="p-3 bg-gray-800 text-white border border-gray-700 rounded-lg w-full focus:outline-none focus:border-blue-500 transition-all"
            rows={4}
          />
          <div className="absolute bottom-3 left-3">
            <EmojiPickerComponent onSelect={handleEmojiSelect} />
          </div>
        </div>
      )}
  
      {/* Cargador de imágenes */}
      <ImageUploader 
        onDrop={(files) => handleImageUpload(files)}
        onUpload={(event) => {
          if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            handleImageUpload(filesArray);
          }
        }}
        selectedImages={selectedImages} 
        onRemoveImage={handleRemoveImage}
        loading={loading} 
      />
  
      {/* Procesador de imágenes */}
      <ImageProcessor 
        selectedImages={selectedImages}
        setNames={setNames}
        setPhoneNumbers={setPhoneNumbers}
      />
  
      {/* Tabla de datos */}
      {firstNames.length > 0 && phoneNumbers.length > 0 && (
        <div className="mt-6 w-full max-w-6xl">
          <TableData 
            names={firstNames} 
            phoneNumbers={phoneNumbers}  
            messages={salesPersonMessages} 
            macros={macros}  
            loading={loading} 
            onGenerateExcel={handleGenerateExcel} 
          />
        </div>
      )}
    </div>
  );
}  

export default OCRComponent;
