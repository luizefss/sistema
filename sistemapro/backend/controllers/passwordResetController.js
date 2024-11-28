// controllers/passwordResetController.js
const bcrypt = require('bcryptjs');
const connection = require('../config/db');

exports.redefinirSenha = (req, res) => {
  const { token, novaSenha } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token não fornecido.' });
  }

  // Verifica se o token existe e se ainda é válido
  const query = `
    SELECT usuario_id, prazo_de_validade 
    FROM tokens_redefinicao 
    WHERE token = ?
  `;
  connection.query(query, [token], (error, results) => {
    if (error) return res.status(500).json({ error: 'Erro no servidor.' });
    if (results.length === 0) return res.status(400).json({ error: 'Token inválido ou expirado.' });

    const { usuario_id, prazo_de_validade } = results[0];
    const now = new Date();

    // Verifica se o token expirou
    if (now > prazo_de_validade) {
      return res.status(400).json({ error: 'Token expirado. Solicite uma nova redefinição de senha.' });
    }

    // Hash da nova senha
    bcrypt.hash(novaSenha, 10, (hashError, hashedPassword) => {
      if (hashError) return res.status(500).json({ error: 'Erro ao hashear a nova senha.' });

      // Atualiza a senha do usuário no banco de dados
      const updateQuery = 'UPDATE usuarios SET senha = ? WHERE id = ?';
      connection.query(updateQuery, [hashedPassword, usuario_id], (updateError) => {
        if (updateError) return res.status(500).json({ error: 'Erro ao atualizar a senha.' });

        // Remove o token após a redefinição de senha bem-sucedida
        const deleteTokenQuery = 'DELETE FROM tokens_redefinicao WHERE token = ?';
        connection.query(deleteTokenQuery, [token], (deleteError) => {
          if (deleteError) console.error('Erro ao deletar o token:', deleteError);
          res.status(200).json({ message: 'Senha redefinida com sucesso!' });
        });
      });
    });
  });
};
