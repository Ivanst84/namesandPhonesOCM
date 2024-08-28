import { useEffect } from 'react';
import Tesseract from 'tesseract.js';
import { filterData } from '../../util/filterData';

interface ImageProcessorProps {
  selectedImages: string[];
  setNames: React.Dispatch<React.SetStateAction<string[]>>;
  setPhoneNumbers: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageProcessor: React.FC<ImageProcessorProps> = ({ selectedImages, setNames, setPhoneNumbers }) => {
  useEffect(() => {
    const processImages = async () => {
      const allNames: string[] = [];
      const allPhoneNumbers: string[] = [];

      for (const image of selectedImages) {
        try {
          const { data: { text } } = await Tesseract.recognize(image, 'eng', { logger: (m) => console.log(m) });
          const { phoneNumbers, names } = filterData(text);
          allNames.push(...names);
          allPhoneNumbers.push(...phoneNumbers);
        } catch (error) {
          console.error('Error durante el reconocimiento de texto:', error);
        }
      }

      setNames(allNames);
      setPhoneNumbers(allPhoneNumbers);
    };

    if (selectedImages.length > 0) {
      processImages();
    }
  }, [selectedImages, setNames, setPhoneNumbers]);

  return null; // No necesita renderizar nada
};

export default ImageProcessor;
