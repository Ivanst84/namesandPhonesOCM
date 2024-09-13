import React from 'react';
import Image from 'next/image';
import ImageDropZone from '../ImageDropZOneProps';
import Spinner from '../ui/Spinner';

interface ImageUploaderProps {
  onDrop: (files: File[]) => void;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImages: string[];
  onRemoveImage: (index: number) => void;
  loading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onDrop, onUpload, loading, selectedImages, onRemoveImage }) => {
  return (
    <div className="w-full max-w-6xl mx-auto relative"> {/* Aumentar el max-width del contenedor */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <Spinner /> {/* Mostrar el spinner cuando está cargando */}
        </div>
      )}
      <ImageDropZone onDrop={onDrop} />
      <input 
        type="file" 
        accept="image/*" 
        onChange={onUpload} 
        multiple 
        className="mb-4 block text-gray-900"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> {/* Ajustar el número de columnas */}
        {selectedImages.map((image, index) => (
          <div 
            key={index} 
            className="relative group w-full h-80 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300" 
          >
            <Image
              src={image} 
              alt={`Uploaded ${index}`} 
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 transform hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <button 
              onClick={() => onRemoveImage(index)}
              className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-2 hover:bg-red-500 transition-all duration-200 transform hover:scale-110 focus:outline-none"
            >
              <span className="text-xl">&times;</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
