import React from 'react';
import Image from 'next/image';
import ImageDropZone from '../ImageDropZOneProps';
import Spinner from '../ui/Spinner';
interface ImageUploaderProps {
  onDrop: (files: File[]) => void;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImages: string[];
  onRemoveImage: (index: number) => void;
  loading: boolean; // Agrega esta prop para manejar el estado de carga
  
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onDrop, onUpload,loading, selectedImages, onRemoveImage }) => {
  return (
    <div className="w-full max-w-6xl mx-auto"> {/* Aumentar el max-width del contenedor */}
     {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <Spinner /> {/* Mostrar el spinner cuando está cargando */}
        </div>
      )}
      <ImageDropZone onDrop={onDrop} />
      <input 
        type="file" 
        accept="image/*" 
        onChange={onUpload} 
        multiple 
        className="mb-4 text-gray-900"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> {/* Ajustar el número de columnas */}
        {selectedImages.map((image, index) => (
          <div 
            key={index} 
            className="relative group w-full h-80 overflow-hidden rounded border border-gray-700 hover:border-gray-500" 
          >
            <Image
              src={image} 
              alt={`Uploaded ${index}`} 
              width={500}  // Ajusta el ancho según tus necesidades
              height={500}
              className="w-full h-full object-contain transition-transform duration-300 transform grayscale"
            />
            <button 
              onClick={() => onRemoveImage(index)}
              className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1 hover:bg-gray-600"
            >
              <span className="text-lg">&times;</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
