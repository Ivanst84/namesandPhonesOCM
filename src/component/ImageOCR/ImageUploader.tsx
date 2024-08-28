import React from 'react';
import ImageDropZone from '../ImageDropZOneProps';

interface ImageUploaderProps {
  onDrop: (files: File[]) => void;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImages: string[];
  onRemoveImage: (index: number) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onDrop, onUpload, selectedImages, onRemoveImage }) => {
  return (
    <div className="w-full max-w-4xl">
      <ImageDropZone onDrop={onDrop} />
      <input 
        type="file" 
        accept="image/*" 
        onChange={onUpload} 
        multiple 
        className="mb-4 text-gray-900"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {selectedImages.map((image, index) => (
          <div 
            key={index} 
            className="relative group w-32 h-32 overflow-hidden rounded border border-gray-700 hover:border-gray-500"
          >
            <img 
              src={image} 
              alt={`Uploaded ${index}`} 
              className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
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
