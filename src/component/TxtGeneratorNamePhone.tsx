import React from "react";
import { generateTxtPhoneName } from "@/util/generateTxtPhoneName";
interface TxtGeneratorNamePhoneProps {
  phoneNumbers: string[];
  names: string[];
  mensaje: string[];
  onClear: () => void;
}
const TxtGeneratorNamePhone: React.FC<TxtGeneratorNamePhoneProps> = ({ phoneNumbers, names,mensaje, onClear }) => {
  const handleGenerateTxt = () => {
    generateTxtPhoneName(phoneNumbers,names,mensaje);
    onClear();
  };
  return (
    <button
      onClick={handleGenerateTxt}
      className="mt-6 px-4 py-2 bg-gray-700 text-gray-100 rounded hover:bg-gray-600 transition"
    >
      Archivo Extencion
    </button>
  );
};
export default TxtGeneratorNamePhone;