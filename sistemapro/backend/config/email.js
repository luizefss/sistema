const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVICE,
  port: process.env.EMAIL_PORT,
  secure: false, // Use true se estiver usando a porta 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Ajuda a evitar problemas de certificado SSL
  },
});

// Verifica a conexão com o servidor de e-mail
transporter.verify((error, success) => {
  if (error) {
    console.error('Erro na configuração de transporte de e-mail:', error);
  } else {
    console.log('Transporte de e-mail configurado corretamente');
  }
});

module.exports = transporter;
