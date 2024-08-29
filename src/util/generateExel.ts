import * as XLSX from 'xlsx';

export const generateExcel = (names: string[], phoneNumbers: string[], messages: string[],macros:string []) => {
    // Construir el mensaje para cada fila
    const data = names.map((name, index) => ({
        Nombre: name,
        Telefono: phoneNumbers[index] || '',
        Mensaje: messages[index] || '' , // Agrega los mensajes aquí
        Macros : macros[index] || '' 
    }));

    // Crear una hoja de cálculo
    const worksheet = XLSX.utils.json_to_sheet(data, { header: ["Nombre", "Telefono", "Mensaje", "Macros"] });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    // Guardar el archivo
    XLSX.writeFile(workbook, "datos.xlsx");
};
