// componente para arrastra y soltar imagnes
// Se añade la funcionalidad de pegar imágenes desde el portapapeles
import React, { useState, useEffect } from 'react';

interface ImageDropZoneProps {
  onDrop: (files: File[]) => void;
}

const ImageDropZone: React.FC<ImageDropZoneProps> = ({ onDrop }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = Array.from(event.dataTransfer.files);
    onDrop(files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };
  
  useEffect(() => {
    // Agregar el manejador de eventos `paste` cuando el componente se monte
    
      const handlePaste = (event: ClipboardEvent) => {
        const items = event.clipboardData?.items; // Añadido el operador de encadenamiento opcional
        if (items) {
          const files = Array.from(items).filter(item => item.kind === 'file').map(item => item.getAsFile()).filter((file): file is File => file !== null);
          if (files.length > 0) {
            onDrop(files);
          }
        }
      };
    document.addEventListener('paste', handlePaste);

    // Limpiar el manejador de eventos cuando el componente se desmonte
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [onDrop]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{
        border: '2px dashed #ccc',
        padding: '60px',
        textAlign: 'center',
        marginBottom: '20px',
        cursor: 'pointer',
        backgroundColor: isDragging ? '#e0f7fa' : 'transparent', // Cambia el color de fondo al arrastrar
        transition: 'background-color 0.3s ease' // Transición suave del color de fondo
      }}
    >
      Arrastra y suelta una imagen aquí o pégala desde el portapapeles
    </div>
  );
};

export default ImageDropZone;
