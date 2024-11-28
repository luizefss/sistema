// controllers/recoveryController.js
const crypto = require('crypto');
const connection = require('../config/db');
const transporter = require('../config/email');

exports.solicitarRedefinicao = (req, res) => {
  const { email } = req.body;

  const query = 'SELECT id FROM usuarios WHERE email = ?';
  connection.query(query, [email], (error, results) => {
    if (error) return res.status(500).json({ error: 'Erro no servidor.' });
    if (results.length === 0) return res.status(404).json({ error: 'Usuário não encontrado.' });

    const userId = results[0].id;
    const token = crypto.randomBytes(32).toString('hex');
    const validade = new Date(Date.now() + 3600000); // 1 hora de validade

    const insertQuery = 'INSERT INTO tokens_redefinicao (usuario_id, token, prazo_de_validade) VALUES (?, ?, ?)';
    connection.query(insertQuery, [userId, token, validade], (insertError) => {
      if (insertError) {
        console.error('Erro ao salvar o token:', insertError);
        return res.status(500).json({ error: 'Erro ao salvar o token.' });
      }

      const resetLink = `http://localhost:3000/redefinir-senha?token=${token}`;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Redefinição de Senha',
        text: `Clique no link para redefinir sua senha: ${resetLink}`,
      };

      transporter.sendMail(mailOptions, (mailError) => {
        if (mailError) {
          console.error('Erro de envio de email:', mailError); // Log do erro completo
          return res.status(500).json({ error: 'Erro ao enviar o email.' });
        }
        res.status(200).json({ message: 'Email de redefinição de senha enviado com sucesso.' });
      });
    });
  });
};
