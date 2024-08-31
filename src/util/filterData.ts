export interface PersonData {
  name: string;
  phoneNumber: string;
}

export const filterData = (text: string): { names: string[], phoneNumbers: string[] } => {
  const lines = text.split('\n');
  const names: string[] = [];
  const phoneNumbers: string[] = [];
  const phoneNumberSet = new Set<string>(); // Set para rastrear números únicos

  lines.forEach(line => {
    const parts = line.split(/\s+/);
    if (parts.length > 1) {
      const name = parts.slice(0, -1).join(' ');
      const phoneNumber = parts[parts.length - 1].replace(/[^0-9]/g, '');

      if (phoneNumber.length >= 10) { // Validación simple
        if (!phoneNumberSet.has(phoneNumber)) { // Verifica si el número ya ha sido procesado
          phoneNumberSet.add(phoneNumber); // Agrega el número al Set
          names.push(name);
          phoneNumbers.push(phoneNumber);
        }
      } else {
        // Opcional: Manejo de número de teléfono inválido
        // names.push(name);
        // phoneNumbers.push('00000'); // Default phone number if invalid
      }
    }
  });

  return { names, phoneNumbers };
};
