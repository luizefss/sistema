// routes/jwtRoutes.js
const express = require('express');
const router = express.Router();
const jwtAuthController = require('../controllers/jwtAuthController');
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');
const logoutController = require('../controllers/logoutController'); // Adicione o controlador de logout

// Rota de login com JWT
router.post('/jwt-login', jwtAuthController.jwtLogin);

// Rota protegida com JWT
router.get('/jwt-protected', jwtAuthMiddleware.verifyToken, (req, res) => {
  res.status(200).json({ message: 'Acesso autorizado com JWT!', user: req.user });
});

// Rota de logout
router.post('/logout', logoutController.logout);

module.exports = router;
