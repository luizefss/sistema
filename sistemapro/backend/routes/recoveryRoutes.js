// routes/recoveryRoutes.js
const express = require('express');
const router = express.Router();
const recoveryController = require('../controllers/recoveryController');

// Exibe o formulário de recuperação de senha
router.get('/recovery', (req, res) => {
  res.render('recovery');
});

// Rota para solicitar redefinição de senha
router.post('/solicitar-redefinicao', recoveryController.solicitarRedefinicao);

module.exports = router;
