import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Hook para redirigir

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate(); // Hook para redirigir

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar datos de registro al backend
      const response = await axios.post('http://localhost:5000/api/register', formData);
      console.log('Usuario registrado:', response.data);

      // Redirigir a la página de inicio de sesión
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h5" gutterBottom>
        Registro de Usuario
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="nombre"
          label="Nombre"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Correo Electrónico"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Registrarse
        </Button>
      </form>
    </Container>
  );
};

export default RegisterPage;
