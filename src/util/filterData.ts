export interface PersonData {
  name: string;
  phoneNumber: string;
}

export const filterData = (text: string): { names: string[], phoneNumbers: string[] } => {
  const lines = text.split('\n');
  const names: string[] = [];
  const phoneNumbers: string[] = [];

  lines.forEach(line => {
    const parts = line.split(/\s+/);
    if (parts.length > 1) {
      const name = parts.slice(0, -1).join(' ');
      const phoneNumber = parts[parts.length - 1].replace(/[^0-9]/g, '');

      if (phoneNumber.length >= 10) { // Simple validation
        names.push(name);
        phoneNumbers.push(phoneNumber);
      } else {
        names.push(name);
        phoneNumbers.push('00000'); // Default phone number if invalid
      }
    }
  });

  return { names, phoneNumbers };
};
