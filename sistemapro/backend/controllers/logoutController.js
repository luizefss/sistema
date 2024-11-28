// controllers/logoutController.js
const connection = require('../config/db');

exports.logout = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ error: 'Token não fornecido.' });
  }

  const query = 'INSERT INTO tokens_revogados (token) VALUES (?)';
  connection.query(query, [token], (error) => {
    if (error) return res.status(500).json({ error: 'Erro ao revogar o token.' });

    res.status(200).json({ message: 'Logout realizado com sucesso!' });
  });
};
