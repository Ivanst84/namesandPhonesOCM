import React, { useState, useEffect } from 'react';
import Table from './ui/Table';
import Spinner from './ui/Spinner';
import ExcelGenerator from './ExelGenerador';
import TxtGenerator from './TxtGenerator';

interface DataTableProps {
  names: string[];
  phoneNumbers: string[];
  messages: string[];
  macros: string[];
  loading: boolean;
  onGenerateExcel: () => void;  
}

const TableData: React.FC<DataTableProps> = ({ names, phoneNumbers, messages, macros, loading }) => {
  const [finalNames, setFinalNames] = useState<string[]>([]);
  const [finalPhoneNumbers, setFinalPhoneNumbers] = useState<string[]>([]);
  const [finalMessages, setFinalMessages] = useState<string[]>([]);
  const [finalMacros, setFinalMacros] = useState<string[]>([]);
  const [disabledButtons, setDisabledButtons] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Filtrar duplicados y almacenar el resultado
    const uniquePhoneNumbers = new Set<string>();
    const filteredNames: string[] = [];
    const filteredPhoneNumbers: string[] = [];
    const filteredMessages: string[] = [];
    const filteredMacros: string[] = [];

    phoneNumbers.forEach((phoneNumber, index) => {
      if (!uniquePhoneNumbers.has(phoneNumber)) {
        uniquePhoneNumbers.add(phoneNumber);
        filteredNames.push(names[index]);
        filteredPhoneNumbers.push(phoneNumber);
        filteredMessages.push(messages[index]);
        filteredMacros.push(macros[index]);
      }
    });

    setFinalNames(filteredNames);
    setFinalPhoneNumbers(filteredPhoneNumbers);
    setFinalMessages(filteredMessages);
    setFinalMacros(filteredMacros);
  }, [names, phoneNumbers, messages, macros]);

  useEffect(() => {
    const dataToStore = JSON.stringify({
      names: finalNames,
      phoneNumbers: finalPhoneNumbers,
      messages: finalMessages,
      macros: finalMacros,
    });
    console.log('useEffect ejecutado', finalNames, finalPhoneNumbers, finalMessages);

    localStorage.setItem('tableData', dataToStore);
    try{
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      console.log('Guardando datos en chrome.storage');
  
      // Guardar los datos en chrome.storage
      chrome.runtime.sendMessage({
        nombres: finalNames,
        numeros: finalPhoneNumbers,
        mensajes: finalMessages,
      }, (response) => {
        console.log('Datos guardados correctamente', response);
      });
    } else {
      throw new Error("API de Chrome no disponible.");
    }
  } catch (error:any) {
    console.error("Error al enviar mensaje a la extensión:", error.message);
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
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <Spinner />
        </div>
      )}
      <Table 
        names={finalNames}
        phoneNumbers={finalPhoneNumbers}
        messages={finalMessages}
        macros={finalMacros}
        disabledButtons={disabledButtons}
        onSendWhatsAppMessage={sendWhatsAppMessage}
      />
<div className="mt-6 flex space-x-4">
<ExcelGenerator 
          names={finalNames} 
          phoneNumbers={finalPhoneNumbers} 
          messages={finalMessages}  
          macros={finalMacros}
          onClear={() => localStorage.removeItem('tableData')} 
        />
        <TxtGenerator
          phoneNumbers={finalPhoneNumbers}
          onClear={() => localStorage.removeItem('tableData')}
        />
      </div>
    </div>
  );
};

export default TableData;
