import React, { useState } from 'react';

import Title from './Title';
import TablaDatos from './TablaDatos';
import ImageUploader from './ImageOCR/ImageUploader';
import ImageProcessor from './ImageOCR/ImageProcessor';
import ExcelGenerator from './ExelGenerador';

const OCRComponent = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [names, setNames] = useState<string[]>([]);
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const handleRemoveImage = (index: number) => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
  };
  // Función para limpiar imágenes y datos
  const clearData = () => {
    setSelectedImages([]);
    setNames([]);
    setPhoneNumbers([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <Title mensaje="Espartanos Web App v 0.1" />

      <ImageUploader 
        onDrop={(files) => {
          const imageUrls = files.map(file => URL.createObjectURL(file));
          setSelectedImages(prevImages => prevImages.concat(imageUrls));
        } }
        onUpload={(event) => {
          if (event.target.files) {
            const filesArray = Array.from(event.target.files).map(file => URL.createObjectURL(file));
            setSelectedImages(prevImages => prevImages.concat(filesArray));
          }
        } }
        selectedImages={selectedImages} 
        onRemoveImage={handleRemoveImage}
        />

      <ImageProcessor 
        selectedImages={selectedImages}
        setNames={setNames}
        setPhoneNumbers={setPhoneNumbers}
      />

      {names.length > 0 && phoneNumbers.length > 0 && (
        <div className="mt-6 w-full">
          <TablaDatos nombres={names} telefonos={phoneNumbers} />
        </div>
      )}

      <ExcelGenerator 
        names={names} 
        phoneNumbers={phoneNumbers} 
        onClear={clearData} 
      />
    </div>
  );
};

export default OCRComponent;
