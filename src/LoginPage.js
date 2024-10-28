import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Hook para redirigir

const LoginPage = () => {
  const [formData, setFormData] = useState({
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
      // Enviar datos de inicio de sesión al backend
      const response = await axios.post('http://localhost:5000/api/login', formData);
      console.log('Inicio de sesión exitoso:', response.data);

      // Redirigir a la página de registro de alumnos (FormPage)
      navigate('/form');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h5" gutterBottom>
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleSubmit}>
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
          Ingresar
        </Button>
      </form>
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item>
          <Typography>
            ¿No tienes cuenta?{' '}
            <Link onClick={() => navigate('/register')} underline="hover">
              Regístrate
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
