import React, { useState, useEffect } from 'react';
import Table from './ui/Table';
import Spinner from './ui/Spinner';
import ExcelGengiterator from './ExelGenerador';
import TxtGenerator from './TxtGenerator';
import TxtGeneratorNamePhone from './TxtGeneratorNamePhone';
const extractFirstName = (fullName: string) => {
  const nameParts = fullName.split(' ');
  return nameParts.length > 0 ? nameParts[0] : '';
};
interface DataTableProps {
  names: string[];
  phoneNumbers: string[];
  messages: string[];
  macros: string[];
  loading: boolean;
  onGenerateExcel: () => void;
  captureType: "both" | "phoneOnly"; // 🔥 Nueva prop para la opción de captura
}

const TableData: React.FC<DataTableProps> = ({ 
  names, 
  phoneNumbers, 
  messages, 
  macros, 
  loading, 
  captureType // 🔥 Se recibe la opción seleccionada
}) => {
  const [finalNames, setFinalNames] = useState<string[]>([]);
  const [finalPhoneNumbers, setFinalPhoneNumbers] = useState<string[]>([]);
  const [finalMessages, setFinalMessages] = useState<string[]>([]);
  const [finalMacros, setFinalMacros] = useState<string[]>([]);
  const [disabledButtons, setDisabledButtons] = useState<Set<number>>(new Set());
  console.log("📊 nombres finales :", finalNames);
  console.log("📞 Final Phone Numbers primera:", finalPhoneNumbers);
  console.log("✉ Final Messages:", finalMessages);
  
  useEffect(() => {
    if (phoneNumbers.length === 0) return; // 🚀 Si no hay números, no hagas nada
    console.log("🛠 Procesando datos en TableData...");

    // 🔥 Filtrar duplicados y almacenar el resultado
    const uniquePhoneNumbers = new Set<string>();
    const filteredNames: string[] = [];
    const filteredPhoneNumbers: string[] = [];
    const filteredMessages: string[] = [];
    const filteredMacros: string[] = [];

    phoneNumbers.forEach((phoneNumber, index) => {
    
      if (!uniquePhoneNumbers.has(phoneNumber)) {
        uniquePhoneNumbers.add(phoneNumber);
        if (captureType === "both") {
          filteredNames.push(names[index] ? extractFirstName(names[index]) : "Desconocido"); 
        }
        filteredPhoneNumbers.push(phoneNumber);
        filteredMessages.push(messages[index]);
        filteredMacros.push(macros[index]);
      }
    });

    setFinalNames(filteredNames);
    setFinalPhoneNumbers(filteredPhoneNumbers);
    setFinalMessages(filteredMessages);
    setFinalMacros(filteredMacros);
  }, [names, phoneNumbers, messages, macros, captureType]);
 
  useEffect(() => {
    if (finalPhoneNumbers.length === 0) return; // 🚀 Evita guardar datos vacíos

    const dataToStore = JSON.stringify({
      names: finalNames,
      phoneNumbers: finalPhoneNumbers,
      messages: finalMessages,
      macros: finalMacros,
    });
   
    try {
      if (typeof chrome !== 'undefined' && chrome.runtime) {
        console.log('Guardando datos en chrome.storage');

        chrome.runtime.sendMessage({
          nombres: finalNames,
          numeros: finalPhoneNumbers,
          mensajes: finalMessages,
        }, (response) => {
          console.log('Datos guardados correctamente', response);
        });
      } else {
        console.error("API de Chrome no disponible. Guardando en localStorage.");
        localStorage.setItem('fallbackData', dataToStore);
      }
    } catch (error) {
      console.error("Error al enviar mensaje a la extensión:", error);
    }
  }, [finalNames, finalPhoneNumbers, finalMessages, finalMacros]);

  
  const sendWhatsAppMessage = (phoneNumber: string, name: string, message: string, index: number) => {
    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
    const whatsappURL = isMobileDevice 
      ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}` 
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');
    setDisabledButtons(prev => new Set(prev).add(index));
  };


  return (
    <div className="relative">
      {/* 🔥 Mostrar total de capturas */}
   
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <Spinner />
        </div>
      )}

      {/* 🔥 Pasamos captureType a Table para manejar nombres/números */}
      <Table 
        names={finalNames}
        phoneNumbers={finalPhoneNumbers}
        messages={finalMessages}
        disabledButtons={disabledButtons}
        onSendWhatsAppMessage={sendWhatsAppMessage}
        captureType={captureType} // 🔥 Se pasa la opción de captura
      />

      <div className="mt-6 flex space-x-4">
        
        <ExcelGenerator 
          names={finalNames} 
          phoneNumbers={finalPhoneNumbers} 
          messages={finalMessages}  
          macros={finalMacros}
          onClear={() => localStorage.removeItem('tableData')} 
        />
        
        {captureType === "both" && (
          <TxtGeneratorNamePhone
            names={finalNames}
            phoneNumbers={finalPhoneNumbers}
            mensaje={finalMessages}
            onClear={() => localStorage.removeItem('tableData')}
          />
        )}

        <TxtGenerator
          phoneNumbers={finalPhoneNumbers}
          onClear={() => localStorage.removeItem('tableData')}
        />
      </div>
    </div>
  );
};

export default TableData;
