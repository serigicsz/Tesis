import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';

const HistoryPage = () => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    // Llamar a la API para obtener el historial de predicciones
    const fetchHistorial = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/historial');
        setHistorial(response.data); // Guardar los datos en el estado
      } catch (error) {
        console.error('Error al obtener el historial:', error);
      }
    };

    fetchHistorial();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography variant="h5" gutterBottom>
        Historial de Predicciones
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Grado</TableCell>
            <TableCell>Sección</TableCell>
            <TableCell>Deserción </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {historial.map((registro, index) => (
            <TableRow key={index}>
              <TableCell>{registro.nombre}</TableCell>
              <TableCell>{registro.apellido}</TableCell>
              <TableCell>{registro.grado}</TableCell>
              <TableCell>{registro.seccion}</TableCell>
              <TableCell>{registro.prediccion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default HistoryPage;
