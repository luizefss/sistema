require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Middleware para processar JSON

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rota de teste para verificar o servidor
app.get('/', (req, res) => {
  res.send('Backend funcionando com CORS habilitado!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
