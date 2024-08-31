import React, { useState, useEffect } from 'react';
import ExcelGenerator from './ExelGenerador';
import Table from './ui/Table';

interface DataTableProps {
  names: string[];
  phoneNumbers: string[];
  messages: string[];
  macros: string[];
  onGenerateExcel: () => void;
}

const TableData: React.FC<DataTableProps> = ({ names, phoneNumbers, messages, macros, onGenerateExcel }) => {
  const [finalNames, setFinalNames] = useState<string[]>([]);
  const [finalPhoneNumbers, setFinalPhoneNumbers] = useState<string[]>([]);
  const [finalMessages, setFinalMessages] = useState<string[]>([]);
  const [finalMacros, setFinalMacros] = useState<string[]>([]);
  const [disabledButtons, setDisabledButtons] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Recuperar datos del localStorage
    const storedData = localStorage.getItem('tableData');
    if (storedData) {
      const { names, phoneNumbers, messages, macros } = JSON.parse(storedData);
      setFinalNames(names);
      setFinalPhoneNumbers(phoneNumbers);
      setFinalMessages(messages);
      setFinalMacros(macros);
    } else {
      // Inicializar con props si no hay datos en el localStorage
      setFinalNames(names);
      setFinalPhoneNumbers(phoneNumbers);
      setFinalMessages(messages);
      setFinalMacros(macros);
    }
  }, []);

  useEffect(() => {
    // Actualizar el estado cuando cambian las props
    setFinalNames(names);
    setFinalPhoneNumbers(phoneNumbers);
    setFinalMessages(messages);
    setFinalMacros(macros);
  }, [names, phoneNumbers, messages, macros]);

  useEffect(() => {
    // Guardar datos en localStorage
    const dataToStore = JSON.stringify({
      names: finalNames,
      phoneNumbers: finalPhoneNumbers,
      messages: finalMessages,
      macros: finalMacros,
    });
    localStorage.setItem('tableData', dataToStore);
  }, [finalNames, finalPhoneNumbers, finalMessages, finalMacros]);

  const sendWhatsAppMessage = (phoneNumber: string, name: string, message: string, index: number) => {
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
    setDisabledButtons(prev => new Set(prev).add(index));
  };

  return (
    <div>
      <Table 
        names={finalNames}
        phoneNumbers={finalPhoneNumbers}
        messages={finalMessages}
        macros={finalMacros}
        disabledButtons={disabledButtons}
        onSendWhatsAppMessage={sendWhatsAppMessage}
      />
      <div className="mt-6">
        <ExcelGenerator 
          names={finalNames} 
          phoneNumbers={finalPhoneNumbers} 
          messages={finalMessages}  
          macros={finalMacros}
          onClear={() => { 
            // Limpiar datos del localStorage si es necesario
            localStorage.removeItem('tableData');
          }} 
        />
      </div>
    </div>
  );
};

export default TableData;
