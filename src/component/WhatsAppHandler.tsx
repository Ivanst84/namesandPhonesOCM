import React, { useRef } from 'react';

interface WhatsAppHandlerProps {
  phoneNumbers: string[];
  messages: string[];
  names: string[];
  onMessageSent: (index: number) => void; // Callback para marcar el mensaje como enviado
}

const WhatsAppHandler: React.FC<WhatsAppHandlerProps> = ({ phoneNumbers, messages, names, onMessageSent }) => {
  const whatsappWindowRef = useRef<Window | null>(null);
  const sentMessagesSet = useRef<Set<number>>(new Set());

  const getRandomDelay = () => {
    const min = 10000; // 10 segundos
    const max = 18000; // 18 segundos
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const sendWhatsAppMessage = async (phoneNumber: string, name: string, message: string, index: number) => {
    try {
      if (sentMessagesSet.current.has(index)) {
        return; // Evitamos enviar múltiples veces al mismo número
      }

      const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
      const whatsappURL = isMobileDevice 
        ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`  // Enlace para móviles
        : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;  // Enlace para WhatsApp Web

      if (!whatsappWindowRef.current || whatsappWindowRef.current.closed) {
        whatsappWindowRef.current = window.open(whatsappURL, 'whatsappWindow', 'width=800,height=600');
      } else {
        whatsappWindowRef.current.location.href = whatsappURL;
        whatsappWindowRef.current.focus(); 
      }

      sentMessagesSet.current.add(index);
      onMessageSent(index); // Notificamos al componente padre que el mensaje fue enviado

      const randomDelay = getRandomDelay();
      await new Promise(resolve => setTimeout(resolve, randomDelay));

    } catch (error) {
      console.error("Error al enviar mensaje por WhatsApp:", error);
    }
  };

  const automateMessageSending = () => {
    let index = 0;
    const intervalId = setInterval(async () => {
      if (index >= phoneNumbers.length) {
        clearInterval(intervalId); 
        return;
      }

      if (!sentMessagesSet.current.has(index)) {
        await sendWhatsAppMessage(phoneNumbers[index], names[index], messages[index], index);
      }

      index++;
    }, getRandomDelay());
  };

  // Automatizar el envío cuando se llame a este componente
  React.useEffect(() => {
    if (phoneNumbers.length > 0) {
      automateMessageSending();
    }
  }, [phoneNumbers]);

  return null;
};

export default WhatsAppHandler;
