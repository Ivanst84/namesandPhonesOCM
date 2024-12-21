import React from 'react';
import { generateTxt } from '@/util/generateTxt';
import emailjs from "emailjs-com";

interface TxtGeneratorProps {
  phoneNumbers: string[];
  onClear: () => void;
}

const TxtGenerator: React.FC<TxtGeneratorProps> = ({ phoneNumbers, onClear }) => {
  const handleGenerateAndSendTxt = async () => {
    // Generar el archivo TXT y obtener su contenido
    const fileContent = generateTxt(phoneNumbers);

    try {
     

      const result = await emailjs.send(
        "service_kam9b6v", // Tu Service ID
        "template_b2x1y6i", // Tu Template ID
        {
          to_email: "ivan.sosatovar@gmail.com", // Correo destinatario
          message: fileContent, // Contenido del archivo como texto
          subject: "Contenido del archivo generado", // Asunto del correo
        },
        "o7bDKiQyYWx1Ba8PV" // Reemplaza con tu User ID de EmailJS
      );

      if (result.status === 200) {
      }
    } catch (error) {
      console.error("Error al enviar el archivo:", error);
    }

    // Limpia los datos si es necesario
    onClear();
  };

  return (
    <button
      onClick={handleGenerateAndSendTxt}
      className="mt-6 px-4 py-2 bg-gray-700 text-gray-100 rounded hover:bg-gray-600 transition"
    >
      Generar archivo TXT
    </button>
  );
};

export default TxtGenerator;
