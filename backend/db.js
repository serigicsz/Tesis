const sql = require('mssql');

const dbConfig = {
    user: 'sa', // Asegúrate de que aquí esté tu usuario SQL
    password: 'abc123', // Asegúrate de que la contraseña sea correcta
    server: 'DESKTOP-ML072E7', // Nombre de tu servidor (puedes ver esto en SSMS)
    database: 'PrediccionDesercion', // Nombre de tu base de datos
    options: {
        encrypt: false, // Si no utilizas un certificado SSL
        trustServerCertificate: true // Esto permite conexiones con certificados no confiables (útil para entornos locales)
    }
};

// Función para conectar a la base de datos
const connectDB = async () => {
    try {
        await sql.connect(dbConfig);
        console.log('Conectado a Microsoft SQL Server');
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
    }
};

module.exports = { connectDB, sql };

