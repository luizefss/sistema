// controllers/passwordController.js
const bcrypt = require('bcryptjs');
const connection = require('../config/db'); // Certifique-se de que a conexão está sendo importada corretamente

exports.alterarSenha = (req, res) => {
  const { senhaAtual, novaSenha } = req.body;
  const userId = req.user.id; // ID do usuário autenticado no token

  console.log("Senha Atual Recebida:", senhaAtual);
  console.log("Nova Senha Recebida:", novaSenha);

  // Consulta a senha atual no banco de dados
  const query = 'SELECT senha FROM usuarios WHERE id = ?';
  connection.query(query, [userId], (error, results) => {
    if (error) return res.status(500).json({ error: 'Erro no servidor.' });
    if (results.length === 0) return res.status(404).json({ error: 'Usuário não encontrado.' });

    const senhaHash = results[0].senha;
    console.log("Senha Hash no Banco de Dados:", senhaHash); // Confirma o hash armazenado no BD

    // Verifica se a senha atual corresponde
    bcrypt.compare(senhaAtual, senhaHash, (err, match) => {
      console.log("Resultado da Comparação:", match); // Adicione para ver o resultado da comparação
      if (err) return res.status(500).json({ error: 'Erro ao verificar a senha.' });
      if (!match) return res.status(401).json({ error: 'Senha atual incorreta.' });

      // Hashear a nova senha e atualizar no banco de dados
      bcrypt.hash(novaSenha, 10, (err, novaSenhaHash) => {
        if (err) return res.status(500).json({ error: 'Erro ao hashear a nova senha.' });

        const updateQuery = 'UPDATE usuarios SET senha = ? WHERE id = ?';
        connection.query(updateQuery, [novaSenhaHash, userId], (updateError) => {
          if (updateError) return res.status(500).json({ error: 'Erro ao atualizar a senha.' });
          res.status(200).json({ message: 'Senha alterada com sucesso!' });
        });
      });
    });
  });
};
