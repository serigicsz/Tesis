import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import FormPage from './FormPage'; // Importar el componente para registrar alumnos
import HistoryPage from './HistoryPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirigir a login si no se ingresa ninguna ruta */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Ruta de registro */}
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Ruta de inicio de sesión */}
        <Route path="/login" element={<LoginPage />} /
        >
         
        {/* Ruta para el formulario de registro de alumnos (FormPage) */}
        <Route path="/form" element={<FormPage />} />
        
        <Route path="/historial" element={<HistoryPage />} />

      </Routes>
    </Router>
  );
};

export default App;
