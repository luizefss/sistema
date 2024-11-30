const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../config/db");
const transporter = require("../config/email");

// Função de registro
exports.register = (req, res) => {
  const { username, email, senha, area } = req.body;

  // Validação dos campos
  if (!username || !email || !senha || !area) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  console.log("Dados recebidos no backend:", req.body);

  // Hash da senha
  bcrypt.hash(senha, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Erro ao hashear a senha:", err);
      return res
        .status(500)
        .json({ error: "Erro interno ao processar senha." });
    }

    const query =
      "INSERT INTO usuarios (username, email, senha, area, ativo) VALUES (?, ?, ?, ?, 0)";
    connection.query(
      query,
      [username, email, hashedPassword, area],
      (error, results) => {
        if (error) {
          // Trata erro de duplicidade
          if (error.code === "ER_DUP_ENTRY") {
            console.error("Erro de duplicidade:", error.sqlMessage);
            return res
              .status(409)
              .json({ error: "O email já está registrado." });
          }

          // Trata outros erros
          console.error("Erro na query de registro:", error);
          return res
            .status(500)
            .json({ error: "Erro ao registrar o usuário." });
        }

        console.log("Resultados da query:", results);
        const userId = results.insertId;

        // Token de ativação exclusivo
        const token = jwt.sign(
          { id: userId, purpose: "activate" },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );

        const activationLink = `${process.env.FRONTEND_URL}/activate-account?token=${token}`;

        // Configuração do e-mail de ativação
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Ativação de Conta",
          text: `Olá ${username},\n\nSua conta foi criada com sucesso! Clique no link abaixo para ativar sua conta:\n\n${activationLink}\n\nApós ativar, faça login com seus dados de acesso.\n\nBem-vindo(a)!\nEquipe`,
        };

        transporter.sendMail(mailOptions, (mailError) => {
          if (mailError) {
            console.error("Erro ao enviar o e-mail de ativação:", mailError);
            return res
              .status(500)
              .json({ error: "Erro ao enviar o e-mail de ativação." });
          }
          res
            .status(201)
            .json({
              message: "Usuário registrado! Um e-mail de ativação foi enviado.",
            });
        });
      }
    );
  });
};

// Função de ativação de conta
exports.activateAccount = (req, res) => {
  const { token } = req.query;

  if (!token) return res.status(400).json({ error: "Token não fornecido." });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || decoded.purpose !== "activate") {
      return res.status(400).json({ error: "Token inválido ou expirado." });
    }

    const userId = decoded.id;
    const query = "UPDATE usuarios SET ativo = 1 WHERE id = ? AND ativo = 0";

    connection.query(query, [userId], (error, results) => {
      if (error || results.affectedRows === 0) {
        return res
          .status(400)
          .json({ error: "Conta já ativada ou inexistente." });
      }

      res.status(200).json({ message: "Conta ativada com sucesso!" });
    });
  });
};

// Função de login
exports.login = (req, res) => {
  const { email, password } = req.body; // Alterado para "password"

  // Verifica se o e-mail e a senha foram fornecidos
  if (!email || !password) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
  }

  console.log("Requisição recebida para login:", req.body);

  // Consulta ao banco de dados para validar o usuário
  const query = "SELECT * FROM usuarios WHERE email = ?";
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Erro ao consultar o banco de dados:", err);
      return res.status(500).json({ error: "Erro interno no servidor." });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "E-mail ou senha inválidos." });
    }

    const user = results[0];

    // Verifica a senha
    bcrypt.compare(password, user.senha, (err, isMatch) => {
      if (err) {
        console.error("Erro ao comparar senhas:", err);
        return res.status(500).json({ error: "Erro interno no servidor." });
      }

      if (!isMatch) {
        return res.status(401).json({ error: "E-mail ou senha inválidos." });
      }

      // Gera o token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, area: user.area },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login realizado com sucesso.",
        user: {
          id: user.id,
          email: user.email,
          area: user.area,
        },
        token,
      });
    });
  });
};
