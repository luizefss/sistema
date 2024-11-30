require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Importa apenas uma vez
const connection = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração específica de CORS
app.use(
  cors({
    origin: "http://localhost:4200", // Permite o frontend acessar
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  })
);

app.use(express.json()); // Middleware para processar JSON

// Rotas de autenticação
app.use("/auth", authRoutes);

// Rota de teste para verificar o servidor
app.get("/", (req, res) => {
  res.send("Backend funcionando com CORS habilitado!");
});

// Inicializa o servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
