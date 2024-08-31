import React, { useState } from 'react';
import Title from './Title';
import ImageUploader from './ImageOCR/ImageUploader';
import ImageProcessor from './ImageOCR/ImageProcessor';
import TableData from './TablaDatos';
import ExcelGenerator from './ExelGenerador';
import { generateMessage } from '../util/generateMessage';
import EmojiPickerComponent from './Emojic/EmojiPicker';
import { FaRegSmile } from 'react-icons/fa'; // Importa el ícono de carita feliz

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
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false); // Estado para mostrar el picker

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

  const handleEmojiSelect = (emoji: string) => {
    const newMessage = customMessage + emoji;
    console.log('Mensaje con emoji:', newMessage); // Verifica cómo se forma el mensaje
    setCustomMessage(newMessage);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <Title mensaje="Espartanos Web App v 0.7 " />

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
        onDrop={(files) => {
          const imageUrls = files.map(file => URL.createObjectURL(file));
          setSelectedImages(prevImages => prevImages.concat(imageUrls));
        }}
        onUpload={(event) => {
          if (event.target.files) {
            const filesArray = Array.from(event.target.files).map(file => URL.createObjectURL(file));
            setSelectedImages(prevImages => prevImages.concat(filesArray));
          }
        }}
        selectedImages={selectedImages} 
        onRemoveImage={handleRemoveImage}
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
            onGenerateExcel={handleGenerateExcel} 
          />
        </div>
      )}

      <ExcelGenerator 
        names={firstNames} 
        phoneNumbers={phoneNumbers} 
        messages={salesPersonMessages}  
        macros={macros}
        onClear={clearData} 
      />
    </div>
  );
};

export default OCRComponent;
