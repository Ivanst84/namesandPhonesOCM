export const generateTxt = (phoneNumbers: string[]) => {
    // Eliminar el prefijo +52 1 de cada número telefónico
    const cleanedPhoneNumbers = phoneNumbers.map(phoneNumber =>
        phoneNumber.replace(/^\+52\s?1?/, '') // Reemplaza el prefijo +52 1 o +52 (si el 1 no está presente)
    );

    // Crear el contenido del archivo .txt con los números telefónicos sin el prefijo
    const data = cleanedPhoneNumbers.join('\n');

    // Crear un blob para el archivo .txt
    const blob = new Blob([data], { type: 'text/plain' });

    // Crear un enlace temporal para descargar el archivo .txt
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'numeros_telefonicos.txt';

    // Simular el clic para descargar el archivo
    document.body.appendChild(link);
    link.click();

    // Remover el enlace después de la descarga
    document.body.removeChild(link);
};
