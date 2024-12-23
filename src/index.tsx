import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/index.css';
import App from './App';

const isMaintenance = true; // Cambia a false para mostrar tu app

const Maintenance = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Se esta trabajando para mejorar el sitio</h1>
      <p>Estamos trabajando en ello. Por favor,contacta al administrador del sitio .</p>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {isMaintenance ? <Maintenance /> : <App />}
  </React.StrictMode>
);
