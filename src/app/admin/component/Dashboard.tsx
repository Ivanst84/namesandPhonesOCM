"use client";

import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { newUsers } from '@/actions/newUsers'; // Asegúrate de importar correctamente tu action
import type { User } from '@/interfaces/user.interface';
import { signOut } from 'next-auth/react';

type FormInputs = {
  name: string;
  email: string;
  password: string;

};

interface Props {
  user: User;
}

const Dashboard = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();


  const onSubmit = async (data: FormInputs) => {
    console.log('Datos del formulario:', data);
    try {
      await newUsers(data.email, data.password, data.name);
      toast.success('Usuario registrado correctamente'); // Prueba directa del toast de éxito

    } catch (error) {
      toast.error('Error al registrar el usuario'); // Prueba directa del toast de error

      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Agregar Nuevo Usuario</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo de correo */}
          <div className="mb-4">
            <label htmlFor='name' className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id='name'
              type='text'
              {...register('name', { required: 'El nombre es obligatorio' })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'El correo es obligatorio' })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'La contraseña es obligatoria', minLength: 6 })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Registrar Usuario
          </button>
          <button
          className="mt-4 w-full bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          onClick={() => signOut({ callbackUrl: '/auth/signin' })}
        >
          Cerrar Sesión
        </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
