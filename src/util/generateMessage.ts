export const generateMessage = (name: string, salesPersonName: string, messageType: string, customMessage: string): string => {
    if (messageType === 'Personalizado') {
      // Retorna el mensaje personalizado tal como lo ingresó el usuario
      return customMessage || '';
    }
  
    // Mensajes predeterminados para otros tipos de mensaje
    switch (messageType) {
      case 'Clientes':
        return `🌟 ¡Hola buenos días, ${name}! 🌟\nSoy ${salesPersonName || 'Asesor de izzi'},\n\nActualmente estás pagando el precio regular. ¿Sabías que tenemos nuevas promociones para ti al realizar un cambio de servicio? Aquí te ofrecemos un nuevo comienzo con estas opciones:\n\n📶 Solo Internet: 100 megas por $369.\n📺 Internet y Cable: 80 megas por $489.\n📡 100 megas y 100 canales por $519.\n\n¡Aprovecha estas ofertas especiales y mejora tu experiencia con izzi hoy mismo!`;
      case 'Nuevos':
        return `🌟 ¡Hola ${name}! 🌟\nSoy ${salesPersonName || 'Asesor de izzi'},\n\nTenemos ofertas exclusivas solo para ti: 📶 Solo Internet: 100 megas por $369.\n📺 Internet y Cable: 80 megas por $489.\n📡 100 megas y 100 canales por $519.\n\n¡Aprovecha estas ofertas especiales y mejora tu experiencia con izzi hoy mismo!`;
      default:
        return `🌟 ¡Hola buenos días, ${name}! 🌟\nSoy ${salesPersonName || 'Asesor de izzi'},\n\nActualmente estás pagando el precio regular. ¿Sabías que tenemos nuevas promociones para ti al realizar un cambio de servicio? Aquí te ofrecemos un nuevo comienzo con estas opciones:\n\n📶 Solo Internet: 100 megas por $369.\n📺 Internet y Cable: 80 megas por $489.\n📡 100 megas y 100 canales por $519.\n\n¡Aprovecha estas ofertas especiales y mejora tu experiencia con izzi hoy mismo!`;
    }
  };
  