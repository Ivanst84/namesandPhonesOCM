import React, { useEffect, useCallback, useState } from 'react';
import Tesseract from 'tesseract.js';
import { filterData } from '../../util/filterData';
import toast from 'react-hot-toast';
import Spinner from '../ui/Spinner';

interface ImageProcessorProps {
  selectedImages: string[];
  setNames: React.Dispatch<React.SetStateAction<string[]>>;
  setPhoneNumbers: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageProcessor: React.FC<ImageProcessorProps> = ({ selectedImages, setNames, setPhoneNumbers }) => {
  const [isLoading, setIsLoading] = useState(false);

  const formatPhoneNumber = (phoneNumber: string) => {
    const countryCode = "+52";
    const mobilePrefix = "1";
    
    // Si el número no incluye el código de país y el prefijo móvil, agrégalo.
    if (!phoneNumber.startsWith(countryCode)) {
      return `${countryCode} ${mobilePrefix} ${phoneNumber}`;
    }
    
    // Devuelve el número sin modificación si ya está en el formato correcto
    return phoneNumber;
  };
  const preprocessImage = (image: HTMLImageElement): HTMLCanvasElement => {
    const zoomFactor = 1.2; // Factor de zoom del 110%
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('No se pudo obtener el contexto 2D del canvas');
    }

    // Ajustar el tamaño del canvas para el zoom
    canvas.width = image.width * zoomFactor;
    canvas.height = image.height * zoomFactor;

    // Dibujar la imagen escalada en el canvas
    ctx.drawImage(image, 0, 0, image.width * zoomFactor, image.height * zoomFactor);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Aplicar escala de grises tenue
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      
      // Convertir a escala de grises con un factor
      const grayscale = 0.3 * red + 0.5 * green + 0.5 * blue;
      
      // Aplicar un factor de intensidad para un efecto tenue
      const factor = 0.7; // Ajusta este valor para obtener el nivel deseado de gris
      data[i] = grayscale * factor; // Red
      data[i + 1] = grayscale * factor; // Green
      data[i + 2] = grayscale * factor; // Blue
    }
    ctx.putImageData(imageData, 0, 0);

    return canvas;
  };

  const processImages = useCallback(async () => {
    if (selectedImages.length === 0) return;

    setIsLoading(true); // Inicia la carga

    const allNames: string[] = [];
    const allPhoneNumbers: string[] = [];

    for (const image of selectedImages) {
      try {
        const img = new Image();
        img.src = image;

        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const preprocessedCanvas = preprocessImage(img);
        const preprocessedImage = preprocessedCanvas.toDataURL('image/png');

        const { data: { text } } = await Tesseract.recognize(preprocessedImage, 'eng', );

        // Parse text and filter data
        const { names: parsedNames, phoneNumbers: parsedPhoneNumbers } = filterData(text);
        const formattedPhoneNumbers = parsedPhoneNumbers.map(formatPhoneNumber);
        

        allNames.push(...parsedNames);
        allPhoneNumbers.push(...formattedPhoneNumbers);
        if(parsedNames.length ===0 && parsedPhoneNumbers.length ===0){
        
          toast('No se encontraron nombres o números de teléfono en la imagen');
          }
      
      
      } catch (error) {
        console.error('Error al procesar la imagen:', error);} {
        setIsLoading(false); // Finaliza la carga, incluso si ocurre un error

      }
    };

    // Ensure arrays are the same length
    const maxLength = Math.max(allNames.length, allPhoneNumbers.length);
    const finalNames = allNames.slice(0, maxLength);
    const finalPhoneNumbers = allPhoneNumbers.slice(0, maxLength);

    // Fill missing values with an empty string
    while (finalNames.length < maxLength) finalNames.push('');
    while (finalPhoneNumbers.length < maxLength) finalPhoneNumbers.push('00000');

    setNames(finalNames);
    setPhoneNumbers(finalPhoneNumbers);
  }, [selectedImages, setNames, setPhoneNumbers]);

  useEffect(() => {
    if (selectedImages.length > 0) {
      processImages();
    }
  }, [selectedImages, processImages]);

  return (
    <div>
          {isLoading && <Spinner />}

   
       </div>
  );
};

export default ImageProcessor;
