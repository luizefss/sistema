// routes/passwordResetRoutes.js
const express = require('express');
const router = express.Router();
const passwordResetController = require('../controllers/passwordResetController');

// Rota para redefinir a senha
router.post('/redefinir-senha', passwordResetController.redefinirSenha);

module.exports = router;
