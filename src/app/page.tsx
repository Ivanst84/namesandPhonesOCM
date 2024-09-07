// src/app/page.tsx

import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/authOptions'; // Ahora importamos correctamente desde el archivo lib
import OCRComponent from '@/component/Kitchen';

export default async function App() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div>
      <OCRComponent />
    </div>
  );
}
