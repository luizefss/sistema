const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');
const transporter = require('../config/email'); 

// Função de registro
exports.register = (req, res) => {
  const { username, email, senha } = req.body;

  if (!username || !email || !senha) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  // Hash da senha
  bcrypt.hash(senha, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Erro ao hashear a senha.' });

    // Insere o usuário com status "inativo"
    const query = 'INSERT INTO usuarios (username, email, senha, ativo) VALUES (?, ?, ?, 0)';
    connection.query(query, [username, email, hashedPassword], (error, results) => {
      if (error) return res.status(500).json({ error: 'Erro ao registrar o usuário.' });

      const userId = results.insertId;

      // Token de ativação exclusivo
      const token = jwt.sign({ id: userId, purpose: 'activate' }, process.env.JWT_SECRET, { expiresIn: '24h' });

      const activationLink = `${process.env.FRONTEND_URL}/activate-account?token=${token}`; // Usa variável de ambiente para o link

      // Configuração do e-mail de ativação
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Ativação de Conta',
        text: `Olá ${username},\n\nSua conta foi criada com sucesso! Clique no link abaixo para ativar sua conta:\n\n${activationLink}\n\nApós ativar, faça login com seus dados de acesso.\n\nBem-vindo(a)!\nEquipe`,
      };

      transporter.sendMail(mailOptions, (mailError) => {
        if (mailError) {
          console.error('Erro ao enviar o e-mail de ativação:', mailError);
          return res.status(500).json({ error: 'Erro ao enviar o e-mail de ativação.' });
        }
        res.status(201).json({ message: 'Usuário registrado! Um e-mail de ativação foi enviado.' });
      });
    });
  });
};

// Função de ativação de conta
exports.activateAccount = (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: 'Token não fornecido.' });
  }

  // Verifica o token e o propósito
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || decoded.purpose !== 'activate') {
      return res.status(400).json({ error: 'Token inválido ou expirado.' });
    }

    const userId = decoded.id;

    // Verifica se a conta já está ativada
    const queryCheck = 'SELECT ativo FROM usuarios WHERE id = ?';
    connection.query(queryCheck, [userId], (error, results) => {
      if (results[0]?.ativo) {
        return res.status(400).json({ error: 'Conta já está ativada.' });
      }

      // Ativa a conta
      const queryActivate = 'UPDATE usuarios SET ativo = 1 WHERE id = ?';
      connection.query(queryActivate, [userId], (error) => {
        if (error) {
          console.error('Erro ao ativar a conta:', error);
          return res.status(500).json({ error: 'Erro ao ativar a conta.' });
        }
        res.status(200).json({ message: 'Conta ativada com sucesso! Agora você pode fazer login.' });
      });
    });
  });
};

// Função de login
exports.login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  connection.query(query, [email], (error, results) => {
    if (error) {
      console.error('Erro ao consultar o banco de dados:', error);
      return res.status(500).json({ error: 'Erro no servidor ao consultar o banco de dados.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    const user = results[0];

    // Verifica se a conta está ativada
    if (!user.ativo) {
      return res.status(403).json({ error: 'Conta não ativada. Verifique seu e-mail para ativação.' });
    }

    bcrypt.compare(senha, user.senha, (err, match) => {
      if (err) {
        console.error('Erro ao verificar a senha:', err);
        return res.status(500).json({ error: 'Erro ao verificar a senha.' });
      }
      if (!match) {
        return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
      }

      // Gera o token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({
        message: 'Login realizado com sucesso!',
        token,
      });
    });
  });
};
