import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string; // Permite añadir clases personalizadas si es necesario
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay para que el logo aparezca después de que la página se haya cargado
    const timer = setTimeout(() => setIsVisible(true), 100); // Retraso de 100ms para el efecto
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex justify-center mb-4 ${className}`}>
      <Image
        src="/espartano.png" // La ruta al archivo PNG en la carpeta public
        alt="Logo"
        width={96}  // Ajusta el tamaño en píxeles
        height={96} // Ajusta el tamaño en píxeles
        className={`transform transition-transform transition-opacity duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-150 opacity-0'} shadow-neon`}
      />
    </div>
  );
};

export default Logo;
