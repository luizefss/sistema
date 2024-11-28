// routes/dashboardRoutes.js
const express = require('express');
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware'); // Middleware para verificar o token JWT
const router = express.Router();

// Rota protegida da Dashboard
router.get('/dashboard', jwtAuthMiddleware.verifyToken, (req, res) => {
  res.status(200).json({ message: 'Bem-vindo à Dashboard!', user: req.user });
});

module.exports = router;
