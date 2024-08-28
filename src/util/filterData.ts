
export interface FilteredData {
    phoneNumbers: string[];
    names: string[];
  }
  export const filterData = (text: string): FilteredData => {
    // Dividir el texto en líneas y limpiar espacios en blanco
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
    // Inicializar arrays para nombres y números de teléfono
    const phoneNumbers: string[] = [];
    const names: string[] = [];
  
    // Expresión regular refinada para detectar números de teléfono
    const phoneNumberRegex = /(?:\+?(\d{1,4}))?[-.\s]?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g;
  
    // Lista de textos a ignorar (encabezados y letras de columnas)
    const ignoredTexts = [
      "Nombre", "Teléfono", "Nombre Teléfono", "Nombres", "Teléfono",
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
      "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
      "Y", "Z"
    ];
  
    console.log('Líneas procesadas:', lines); // Depuración: Verificar líneas procesadas
  
    lines.forEach(line => {
      // Verificar si la línea es un encabezado o letra de columna
      const isIgnored = ignoredTexts.some(ignored => line.toUpperCase().startsWith(ignored));
  
      if (isIgnored) {
        console.log('Ignorada:', line); // Depuración: Línea ignorada
        return;
      }
  
      // Extraer números de teléfono de la línea
      const matches = line.match(phoneNumberRegex);
  
      if (matches) {
        matches.forEach(match => {
          // Limpiar el número de teléfono (quitar caracteres no numéricos)
          const cleanNumber = match.replace(/\D/g, '');
          if (cleanNumber) {
            phoneNumbers.push(cleanNumber);
          }
        });
      }
  
      // Eliminar números de teléfono de la línea para obtener el nombre
      const name = line.replace(phoneNumberRegex, '').trim();
  
      // Agregar nombre si no es un encabezado o letra de columna
      if (name.length > 0 && !isIgnored) {
        names.push(name);
      }
    });
  
    console.log('Datos filtrados:', { phoneNumbers, names }); // Depuración para verificar los datos
  
    return { phoneNumbers, names };
  };