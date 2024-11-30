// authRoutes.js
const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Rota para registro
router.post('/register', authController.register);

// Rota para login
router.post("/login", authController.login);

// Rota para ativação de conta
router.get("/activate-account", authController.activateAccount);

module.exports = router;
