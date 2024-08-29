import React, { useState } from 'react';
import Title from './Title';
import ImageUploader from './ImageOCR/ImageUploader';
import ImageProcessor from './ImageOCR/ImageProcessor';
import TableData from './TablaDatos';
import ExcelGenerator from './ExelGenerador';

// Función para extraer el primer nombre
const extractFirstName = (fullName: string) => {
  const nameParts = fullName.split(' ');
  return nameParts.length > 0 ? nameParts[0] : '';
};

const OCRComponent: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [names, setNames] = useState<string[]>([]);
  const [message, setMessage] = useState<string[]>([]);
  const [macro, setMacro] = useState<string[]>([]);
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);

  // Extraer primeros nombres para usar en la tabla y el Excel
  const firstNames = names.map(extractFirstName);

  const messages = firstNames.map(name => 
    `¡Hola buenos días, ${name}! Soy Ángel, Asesor de izzi. Actualmente estás pagando el precio regular. ¿Sabías que tenemos nuevas promociones para ti al realizar un cambio de servicio? ¡Te ofrecemos un nuevo comienzo con estas opciones: " & "Solo Internet: 100 megas por $369. " & "Internet y Cable: 80 megas por $489. " & "100 megas y 100 canales por $519. " & "¡Aprovecha estas ofertas especiales y mejora tu experiencia con izzi hoy mismo!"`
  );

  const macros = firstNames.map((name, index) => 
    `="https://wa.me/" & ${phoneNumbers[index]} & "?text=" & SUSTITUIR(SUSTITUIR(${messages[index]}, " ", "%20"), ",", "%2C")`
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
    setMessage([]);
    setMacro([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <Title mensaje="Espartanos Web App v 0.7 " />

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
            messages={message} 
            macros={macros}  
            onGenerateExcel={handleGenerateExcel} 
          />
        </div>
      )}

      <ExcelGenerator 
        names={firstNames} 
        phoneNumbers={phoneNumbers} 
        messages={messages}  
        macros={macros}
        onClear={clearData} 
      />
    </div>
  );
};

export default OCRComponent;
