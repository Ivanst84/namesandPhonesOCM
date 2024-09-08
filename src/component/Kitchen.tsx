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
import router from 'next/router';
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

  const clearData = () => {
    setSelectedImages([]);
    setNames([]);
    setPhoneNumbers([]);
    setSalesPersonName('');
    setCustomMessage(''); // Limpiar el mensaje personalizado
  };
    const handleImageUpload = (files: File[]) => {
    setLoading(true); // Mostrar el spinner
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prevImages => prevImages.concat(imageUrls));
    setLoading(false); // Ocultar el spinner cuando se complete
  };


  const handleEmojiSelect = (emoji: string) => {
    const newMessage = customMessage + emoji;
    console.log('Mensaje con emoji:', newMessage); // Verifica cómo se forma el mensaje
    setCustomMessage(newMessage);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
     <button
  onClick={async () => {
    await signOut();
    window.location.href = '/auth/signin';  // Usar window.location para redirigir en un Client Component
  }}
  className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
>
  Logout
</button>

    <Logo/>

      
      <Title mensaje="Espartanos Web App v 1.0 Beta " />

      <input 
        type="text" 
        placeholder="Ingresa tu nombre" 
        value={salesPersonName}
        onChange={(e) => setSalesPersonName(e.target.value)} 
        className="p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded"
      />

      <select
        value={messageType}
        onChange={(e) => setMessageType(e.target.value)}
        className="p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded"
      >
        <option value="Nuevos">Nuevos</option>
        <option value="Clientes">Clientes</option>
        <option value="Personalizado">Personalizado</option>
      </select>

      {messageType === 'Personalizado' && (
        <div className="relative w-full">
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Ingresa tu mensaje personalizado aquí..."
            className="p-2 bg-gray-800 text-white border border-gray-600 rounded w-full"
            rows={4}
          />
          <div className="absolute bottom-2 left-2">
            <EmojiPickerComponent onSelect={handleEmojiSelect} />
          </div>
        </div>
      )}
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
        loading={loading} // Pasar el estado de carga
      />
      <ImageProcessor 
        selectedImages={selectedImages}
        setNames={setNames}
        setPhoneNumbers={setPhoneNumbers}
      />

      {firstNames.length > 0 && phoneNumbers.length > 0 && (
        <div className="mt-6 w-full">
         
          <TableData 
          
            names={firstNames} 
            phoneNumbers={phoneNumbers}  
            messages={salesPersonMessages} 
            macros={macros}  
            loading={loading} // Pasar el estado de carga
            onGenerateExcel={handleGenerateExcel} 
          />
        </div>
      )}

    </div>
  );
};

export default OCRComponent;
