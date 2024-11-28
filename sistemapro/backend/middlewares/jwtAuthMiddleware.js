// middlewares/jwtAuthMiddleware.js
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Token não fornecido.' });
  }

  // Verifica se o token foi revogado
  const query = 'SELECT * FROM tokens_revogados WHERE token = ?';
  connection.query(query, [token], (error, results) => {
    if (error) return res.status(500).json({ error: 'Erro ao verificar o token.' });
    
    if (results.length > 0) {
      // Token está revogado, acesso negado
      return res.status(401).json({ error: 'Token revogado. Faça login novamente.' });
    }

    // Verifica o token JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Falha na autenticação do token.' });
      }
      req.user = decoded; // Salva os dados do usuário decodificados no request
      next();
    });
  });
};
