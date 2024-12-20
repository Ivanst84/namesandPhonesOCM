// Función para mezclar el orden de los paquetes de forma aleatoria
const generateRandomOrder = (packages: string[]): string => {
  for (let i = packages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [packages[i], packages[j]] = [packages[j], packages[i]];
  }
  return packages.join('\n');
};

// Función para generar un nombre de marca aleatorio
const randomBrandName = () => {
  const brandVariations = ['izzi', 'izz!', 'izi', 'iz!!'];
  return brandVariations[Math.floor(Math.random() * brandVariations.length)];
};

// Función para generar introducciones aleatorias
const randomIntroduction = (name: string, salesPersonName: string) => {
  const introductions = [
    `🌟 ¡Buen día ${name}! 🌟\nTe saluda ${salesPersonName || `un asesor de ${randomBrandName()}`},`,
    `🎉 ¡Qué tal, ${name}! \nSoy ${salesPersonName || `un representante de ${randomBrandName()}`},`,
    ` ¡Saludos, ${name}! 📢\nAquí ${salesPersonName || `desde ${randomBrandName()}`},`,
    `✨ ¡Hola! ${name}! ✨\nMi nombre es ${salesPersonName || `y soy parte de ${randomBrandName()}`},`,
  ];
  return introductions[Math.floor(Math.random() * introductions.length)];
};

// Función principal
export const generateMessage = (
  name: string,
  salesPersonName: string,
  messageType: string,
  customMessage: string
): string => {
  // Si el mensaje es personalizado, lo retornamos con nombre y asesor
  if (messageType === 'Personalizado') {
    return ` ¡Hola ${name}! 🌟\n${customMessage}\n\nAtentamente, ${salesPersonName || `Asesor de ${randomBrandName()}`}`;
  }

  // Paquetes de precios para los mensajes predefinidos
  const packagesClientes = [
    `📡 Solo Internet: 60 megas por $389`,
    `📡 Solo Internet: 80 megas por $419 ($369 al domiciliar)`,
    `📡 Solo Internet: 100 megas por $439 ($389 al domiciliar)`,
    `📺 Internet + TV: 80 megas y 200 canales por $569 ($519 al domiciliar)`,
    `📺 Internet + TV: 100 megas y 200 canales por $589 ($539 al domiciliar)`,
    `📶 Incluye Vix premium   Y Max Gratis`,

  ];

  const packagesNuevos = [
    `📡 Solo Internet: 60 megas por $389`,
    `📡 Solo Internet: 80 megas por $419 ($369 al domiciliar)`,
    `📡 Solo Internet: 100 megas por $439 ($389 al domiciliar)`,
    `📺 Internet + TV: 80 megas y 200 canales por $569 ($519 al domiciliar)`,
    `📺 Internet + TV: 100 megas y 200 canales por $589 ($539 al domiciliar)`,
    `📶 Incluye Vix premium   Y Max Gratis`, // Este precio parece fijo según lo mencionado
];


  // Generar el orden aleatorio de los paquetes
  const shuffledClientesPackages = generateRandomOrder(packagesClientes);
  const shuffledNuevosPackages = generateRandomOrder(packagesNuevos);

  // Variar también las frases finales/despedidas
  const despedidas = [
    "¡No pierdas esta oportunidad!",
    "¡Aprovecha ahora y contáctame!",
    "Estoy aquí para resolver tus dudas.",
    "Quedo atento.",
  ];
  const randomDespedida = () => despedidas[Math.floor(Math.random() * despedidas.length)];

  // Mensajes predefinidos para Clientes y Nuevos
  const clienteMessages = [
    `${randomIntroduction(name, salesPersonName)}\n\nActualmente estás pagando mucho por su servicio Actual=. ¡Tenemos promociones para ti! Aquí te dejo algunas opciones:\n\n${shuffledClientesPackages}\n\n${randomDespedida()}`,
    `${randomIntroduction(name, salesPersonName)}\n\n Le podemos ofrecer estas nuevas promociones exclusivas:\n\n${shuffledClientesPackages}\n\n${randomDespedida()}`,
    `${randomIntroduction(name, salesPersonName)}\n\n¡No te pierdas nuestras nuevas ofertas! Aquí te dejo las opciones disponibles:\n\n${shuffledClientesPackages}\n\n${randomDespedida()}`,
  ];

  const nuevosMessages = [
    `${randomIntroduction(name, salesPersonName)}\n\nEstamos emocionados de ofrecerte estas promociones exclusivas:\n\n${shuffledNuevosPackages}\n\n${randomDespedida()}`,
    `${randomIntroduction(name, salesPersonName)}\n\n¡Te tenemos una oferta especial! Aquí tienes nuestras promociones:\n\n${shuffledNuevosPackages}\n\n${randomDespedida()}`,
    `${randomIntroduction(name, salesPersonName)}\n\nNos encantaría que aproveches nuestras ofertas. Aquí tienes las opciones:\n\n${shuffledNuevosPackages}\n\n${randomDespedida()}`,
  ];

  // Selecciona aleatoriamente un mensaje de los arrays predefinidos
  switch (messageType) {
    case 'Clientes':
      return clienteMessages[Math.floor(Math.random() * clienteMessages.length)];
    case 'Nuevos':
      return nuevosMessages[Math.floor(Math.random() * nuevosMessages.length)];
    default:
      return clienteMessages[Math.floor(Math.random() * clienteMessages.length)];
  }
};
