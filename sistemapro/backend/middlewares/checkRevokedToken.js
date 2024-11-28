// middlewares/checkRevokedToken.js
const connection = require('../config/db');
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Token não fornecido.' });
  }

  // Verifica se o token foi revogado
  const query = 'SELECT * FROM tokens_revogados WHERE token = ?';
  connection.query(query, [token], (error, results) => {
    if (error) return res.status(500).json({ error: 'Erro no servidor ao verificar o token.' });
    if (results.length > 0) {
      return res.status(401).json({ error: 'Token revogado.' });
    }

    // Verifica a validade do token JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Token inválido ou expirado.' });
      req.user = decoded;
      next();
    });
  });
};
