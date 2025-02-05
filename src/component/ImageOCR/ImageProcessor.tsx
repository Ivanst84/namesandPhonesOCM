import React, { useEffect, useCallback, useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { filterData } from '../../util/filterData';
import toast from 'react-hot-toast';
import Spinner from '../ui/Spinner';

interface ImageProcessorProps {
  selectedImages: string[];
  setNames: React.Dispatch<React.SetStateAction<string[]>>;
  setPhoneNumbers: React.Dispatch<React.SetStateAction<string[]>>;
  captureType: "both" | "phoneOnly";
}

console.log("🔥 Iniciando ImageProcessor...");

const ImageProcessor: React.FC<ImageProcessorProps> = ({ selectedImages, setNames, setPhoneNumbers, captureType }) => {
  const [isLoading, setIsLoading] = useState(false);
  // Usamos un ref para mantener el conjunto de imágenes procesadas sin provocar re-renderizados
  const processedImages = useRef<Set<string>>(new Set());

  const formatPhoneNumber = (phoneNumber: string) => {
    const countryCode = "+52";
    const mobilePrefix = "1";
    return !phoneNumber.startsWith(countryCode)
      ? `${countryCode} ${mobilePrefix} ${phoneNumber}`
      : phoneNumber;
  };

  const preprocessImage = (image: HTMLImageElement): HTMLCanvasElement => {
    const zoomFactor = 1.2;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No se pudo obtener el contexto 2D del canvas');

    canvas.width = image.width * zoomFactor;
    canvas.height = image.height * zoomFactor;
    ctx.drawImage(image, 0, 0, image.width * zoomFactor, image.height * zoomFactor);

    return canvas;
  };

  const processImages = useCallback(async () => {
    if (selectedImages.length === 0) return;

    setIsLoading(true);
    const allNames: string[] = [];
    const allPhoneNumbers: string[] = [];

    for (const image of selectedImages) {
      // Usamos processedImages.current en lugar de processedImages (ref)
      if (processedImages.current.has(image)) continue; // ✅ No procesar imágenes repetidas

      try {
        const img = new Image();
        img.src = image;
        await new Promise((resolve) => { img.onload = resolve; });

        const preprocessedCanvas = preprocessImage(img);
        const preprocessedImage = preprocessedCanvas.toDataURL('image/png');

        console.log("🔍 Procesando imagen con OCR...");
        const { data: { text } } = await Tesseract.recognize(preprocessedImage, 'eng');

        console.log("📜 Texto detectado por OCR:\n", text);

        const { names: parsedNames, phoneNumbers: parsedPhoneNumbers } = filterData(text, captureType);
        const formattedPhoneNumbers = parsedPhoneNumbers.map(formatPhoneNumber);

        console.log("📞 Números detectados:", parsedPhoneNumbers);
        console.log("👤 Nombres detectados:", parsedNames);

        if (captureType === "both") {
          console.log("📞 Números detectados en both:", parsedPhoneNumbers);
          console.log("👤 Nombres detectados:", parsedNames);
          allNames.push(...parsedNames);
        }
        allPhoneNumbers.push(...formattedPhoneNumbers);
        console.log("📞 Números detectados fuera del both:", parsedPhoneNumbers);

        if (
          (captureType === "both" && parsedNames.length === 0 && parsedPhoneNumbers.length === 0) || 
          (captureType === "phoneOnly" && parsedPhoneNumbers.length === 0)
        ) {
          toast('⚠ No se encontraron datos en la imagen.');
          continue;
        }

        // Marcamos la imagen como procesada sin causar re-render (usando el ref)
        processedImages.current.add(image);

      } catch (error) {
        console.error('❌ Error al procesar la imagen:', error);
      }
    }

    if (captureType === "phoneOnly" && allPhoneNumbers.length === 0) {
      toast('⚠ No se encontraron números de teléfono en la imagen.');
      setIsLoading(false);
      return;
    }
    
    console.log("Antes de todo en ImageProcessor - Nombres:", allNames);
    console.log("Antes de todo en ImageProcessor - Teléfonos:", allPhoneNumbers);
    const maxLength = Math.max(allNames.length, allPhoneNumbers.length);
    const finalNames = captureType === "both" ? allNames.slice(0, maxLength) : Array(maxLength).fill('');
    const finalPhoneNumbers = allPhoneNumbers.slice(0, maxLength);

    console.log("ANTES DE MANDARLO AL SET - finalNames:", finalNames);
    console.log("ANTES DE MANDARLO AL SET - finalPhoneNumbers:", finalPhoneNumbers);
    // Actualizamos los estados solo una vez
    setNames(finalNames);
    setPhoneNumbers(finalPhoneNumbers);
    setIsLoading(false);
  }, [selectedImages, setNames, setPhoneNumbers, captureType]); // Ya no incluimos processedImages en las dependencias

  useEffect(() => {
    if (selectedImages.length > 0) {
      processImages();
    }
  }, [selectedImages, processImages]);

  return <div>{isLoading && <Spinner />}</div>;
};

export default ImageProcessor;
