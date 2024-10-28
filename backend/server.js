const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bcrypt = require('bcrypt');

const { connectDB, sql } = require('./db');  // Importamos la conexión de db.js

const app = express();
app.use(cors());
app.use(express.json());  // Middleware para procesar JSON

// Conectar a la base de datos al iniciar el servidor
connectDB();

// ====================== RUTAS PARA USUARIOS ======================

// Ruta para registrar un nuevo usuario
app.post('/api/register', async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar usuario en la base de datos
        const result = await sql.query`
            INSERT INTO Usuarios (nombre, email, password)
            VALUES (${nombre}, ${email}, ${hashedPassword})
        `;

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
});

// Ruta para iniciar sesión
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await sql.query`SELECT * FROM Usuarios WHERE email = ${email}`;
        const user = result.recordset[0];

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
});

// ====================== RUTAS PARA ALUMNOS ======================

app.post('/api/registerAlumno', async (req, res) => {
    const { nombre, apellido, edad, grado, seccion, conducta, distrito, asistencia, matematicas, comunicacion, ciencias_sociales, cta, ingles } = req.body;

    try {
        // Paso 1: Registrar al alumno en la base de datos
        const result = await sql.query`
            INSERT INTO Alumnos (nombre, apellido, edad, grado, seccion, conducta, distrito, asistencia, matematicas, comunicacion, ciencias_sociales, cta, ingles)
            OUTPUT INSERTED.id
            VALUES (${nombre}, ${apellido}, ${edad}, ${grado}, ${seccion}, ${conducta}, ${distrito}, ${asistencia}, ${matematicas}, ${comunicacion}, ${ciencias_sociales}, ${cta}, ${ingles})
        `;

        const alumnoId = result.recordset[0].id;
        console.log('Alumno registrado con ID:', alumnoId);

        // Paso 2: Ejecutar el modelo de predicción en Python
        const formData = { edad, grado, conducta, asistencia, matematicas, comunicacion, ciencias_sociales, cta, ingles };
        try {
            const { data } = await axios.post('http://127.0.0.1:3001/prediction', formData);
             await sql.query`
               UPDATE Alumnos
               SET prediccion = ${Number(data.prediction)}
               WHERE id = ${alumnoId}
           `;
            return res.json({ response: data });
        } catch (error) {
            console.log(error)
            return res.status(500).end();
        }

    } catch (error) {
        console.error('Error al registrar el alumno o realizar la predicción:', error);
        res.status(500).json({ message: 'Error al registrar el alumno o realizar la predicción', error });
    }
});

app.get('/api/historial', async (req, res) => {
    try {
        // Consulta para obtener todos los registros del historial de alumnos
        const result = await sql.query`
            SELECT nombre, apellido, grado, seccion, prediccion
            FROM Alumnos
        `;

        // Enviar el historial de predicciones
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener el historial:', error);
        res.status(500).json({ message: 'Error al obtener el historial', error });
    }
});




/////////////////////////////////////////////////////////////////////

app.get('/api/historial', async (req, res) => {
    try {
        // Consulta para obtener todos los registros del historial de alumnos
        const result = await sql.query`
            SELECT nombre, apellido, grado, seccion, prediccion
            FROM Alumnos
        `;

        // Enviar el historial de predicciones
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener el historial:', error);
        res.status(500).json({ message: 'Error al obtener el historial', error });
    }
});


// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
