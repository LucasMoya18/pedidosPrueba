import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'junction.proxy.rlwy.net',
  user: 'root',
  password: 'xDblAenccaILLQlpXDxCtYaGwgnzpcAg',
  database: 'pedidosDb',
  port: 53187
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');
});

// Endpoint para insertar datos del pedido
app.post('/api/pedido', (req, res) => {
  const { pedidos, nombreCliente, direccion, telefono } = req.body;

  // Insertar cada pedido en la base de datos
  pedidos.forEach((pedido) => {
    const query = 'INSERT INTO pedidos (sandwich, agregado, cantidad, nombreCliente, direccion, telefono) VALUES (?, ?, ?, ?, ?, ?)';
    
    connection.query(query, [pedido.sandwich, pedido.agregado, pedido.cantidad, nombreCliente, direccion, telefono], (error, results) => {
      if (error) {
        console.error('Error al insertar datos:', error);
        return res.status(500).json({ error });
      }
    });
  });

  res.status(200).json({ message: 'Pedidos agregados con éxito' });
});

// Iniciar el servidor
app.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001');
});
