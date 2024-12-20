export const generateTxtPhoneName = (phoneNumbers: string[], names: string[], mensaje:string[]) => {

   // CREAMOS LA FUNCION DE TAL FORMA QUE SE GUARDE EN EL BLOCK DE NOTA  CON EL SIGUIENTE PATRON DE DATOSEJEMPLO:
   /*
Juan|+526864631530|Hola Juanito espero que estés bien
Pedro|+526864631530|Hola Pedro espero que estés fine
Victoriua|+526864631530|Hola victoria espero que estés exelente
Pedro|+526864631530|Hola Pedro espero que estés fine
Pedro3|+526864631530|Hola Pedro33333333 espero que estés fine
Pedro|+526864631530|Hola Pedro4 espero que estés fine   
   */
    // Eliminar el prefijo +52 1 de cada número telefónico
    const cleanedPhoneNumbers = phoneNumbers.map(phoneNumber =>
        phoneNumber.replace(/^\+52\s?1?/, '') // Reemplaza el prefijo +52 1 o +52 (si el 1 no está presente)
    );

    // Crear el contenido del archivo .txt con los números telefónicos sin el prefijo
    const data = cleanedPhoneNumbers.map((phoneNumber, index) => {
        return `${names[index]}|${phoneNumber}|${mensaje[index]}`;
    }).join('\n');

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

}