export const filterData = (text: string, captureType: "both" | "phoneOnly"): { names: string[], phoneNumbers: string[] } => {
  const lines = text.split('\n');
  const names: string[] = [];
  const phoneNumbers: string[] = [];
  const phoneNumberSet = new Set<string>(); // Set para evitar duplicados

  lines.forEach(line => {
    const trimmedLine = line.trim();
    const potentialPhoneNumbers = trimmedLine.match(/\b\d{10,}\b/g); // Encuentra números de 10+ dígitos

    if (captureType === "phoneOnly") {
      if (potentialPhoneNumbers) {
        potentialPhoneNumbers.forEach(phoneNumber => {
          if (!phoneNumberSet.has(phoneNumber)) {
            phoneNumbers.push(phoneNumber);
            phoneNumberSet.add(phoneNumber);
          }
        });
      }
    } else {
      // 🟢 Modo "both": Capturar nombres con sus respectivos números
      if (potentialPhoneNumbers) {
        const name = trimmedLine.replace(/\b\d{10,}\b/g, '').trim(); // Elimina el número y deja el texto como nombre
        potentialPhoneNumbers.forEach(phoneNumber => {
          if (!phoneNumberSet.has(phoneNumber)) {
            phoneNumberSet.add(phoneNumber);
            names.push(name || "Desconocido"); // Si no hay nombre, poner "Desconocido"
            phoneNumbers.push(phoneNumber);
          }
        });
      }
    }
  });

  return { names, phoneNumbers };
};
