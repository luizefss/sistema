const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');
const transporter = require('../config/email'); // Importa o transporter de e-mail

exports.jwtLogin = (req, res) => {
  const { email, senha } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  connection.query(query, [email], (error, results) => {
    if (error) return res.status(500).json({ error: 'Erro no servidor.' });
    if (results.length === 0) return res.status(401).json({ error: 'Usuário não encontrado.' });

    const user = results[0];

    // Verifica se a conta está ativada
    if (!user.ativo) {
      return res.status(403).json({ error: 'Conta não ativada. Verifique seu e-mail para ativação.' });
    }

    bcrypt.compare(senha, user.senha, (err, match) => {
      if (err) return res.status(500).json({ error: 'Erro ao verificar a senha.' });
      if (!match) return res.status(401).json({ error: 'Senha incorreta.' });

      // Gera um token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      console.log("Login bem-sucedido para o usuário:", email);

      // Envio de e-mail de confirmação de login
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Confirmação de Login',
        text: `Olá ${user.username}, seu login foi realizado com sucesso!`,
      };

      transporter.sendMail(mailOptions, (mailError) => {
        if (mailError) {
          console.error('Erro de envio de email:', mailError); // Log detalhado do erro
        } else {
          console.log('E-mail de confirmação de login enviado com sucesso!');
        }
      });

      res.status(200).json({ message: 'Login JWT realizado com sucesso!', token });
    });
  });
};
