import * as XLSX from 'xlsx';

export const generateExcel = (names: string[], phoneNumbers: string[]) => {
    const data = names.map((name, index) => ({
      Nombre: name,
      Telefono: phoneNumbers[index] || '',
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(data, { header: ["Nombre", "Telefono"] });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
  
    XLSX.writeFile(workbook, "datos.xlsx");
  };
  
  