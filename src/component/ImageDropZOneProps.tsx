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
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items) {
        const files = Array.from(items)
          .filter(item => item.kind === 'file')
          .map(item => item.getAsFile())
          .filter((file): file is File => file !== null);
        if (files.length > 0) {
          onDrop(files);
        }
      }
    };
    document.addEventListener('paste', handlePaste);
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
        borderRadius: '20px', // Bordes redondeados
        padding: '60px',
        textAlign: 'center',
        marginBottom: '20px',
        cursor: 'pointer',
        backgroundColor: isDragging ? '#f0f9ff' : '#f9f9f9', // Color más suave
        transition: 'background-color 0.3s ease, transform 0.3s ease', // Transiciones suaves
        boxShadow: isDragging
          ? '0 10px 20px rgba(0, 150, 136, 0.2)'
          : '0 4px 12px rgba(0, 0, 0, 0.1)', // Sombras suaves al arrastrar
        transform: isDragging ? 'scale(1.02)' : 'scale(1)', // Animación de escala
      }}
    >
      <div
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '18px',
          color: '#333',
          transition: 'color 0.3s ease',
        }}
      >
        {isDragging ? '¡Suelta aquí la imagen!' : 'Arrastra y suelta una imagen aquí o pégala desde el portapapeles'}
      </div>
    </div>
  );
};

export default ImageDropZone;
