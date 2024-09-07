import { getUsers } from '@/actions/getUsers';
import OCRComponent from '@/component/Kitchen';
import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';


export default async function App() {
  const session = await getServerSession(authOptions);
  console.log("esto es el session", session); 
  if (!session) {

    redirect('/auth/signin'); // Redirige al login si no hay sesión
  }
 
  if (session.user.role == 'ADMIN') {
    redirect('/admin/dashboard'); // Redirige al home si no es admin
  }

  const users = await getUsers();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <OCRComponent />
    </div>
  );
}
