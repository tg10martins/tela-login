import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql';

// Load Config
dotenv.config({ path: './config/config.env' });

// Run Server
const server = express();
const port = process.env.PORT || 5000;

server.listen(port, console.log("Servidor LEGAL rodando em " + process.env.NODE_ENV + " na porta " + port + "..."));

server.get('/', (req, res) => {
    res.send("Página Inicial")
});

server.get('/user', (req, res) => {
    res.send('Página do Usuário')
})

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'foodreview',
  password : 'foodreview',
  database : 'foodreview'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();



