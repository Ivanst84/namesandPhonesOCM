// /components/CustomToast.tsx
import { toast } from 'react-hot-toast';

interface ToastProps {
  message?: string; // Mensaje opcional
  type: 'success' | 'error'; // Tipo de notificación
}

const CustomToast = ({ message, type }: ToastProps) => {
  const defaultMessages = {
    success: 'Operación realizada con éxito',
    error: 'Ocurrió un error. Inténtalo de nuevo.',
  };

  const showToast = () => {
    if (type === 'success') {
      toast.success(message || defaultMessages.success);
    } else if (type === 'error') {
      toast.error(message || defaultMessages.error);
    }
  };

  return { showToast };
};

export default CustomToast;
