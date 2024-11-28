// routes/logoutRoutes.js
const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');

// Rota de logout
router.post('/logout', logoutController.logout);

module.exports = router;
