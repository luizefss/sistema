const connection = require('../config/db');

// Tabela de Usuários
const usuariosTable = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    area VARCHAR(100) NOT NULL, -- Campo área adicionado
    ativo TINYINT(1) DEFAULT 0,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// Tabela de Tokens de Verificação
const tokensVerificacaoTable = `
  CREATE TABLE IF NOT EXISTS tokens_verificacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    expiracao TIMESTAMP NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
  );
`;

// Tabela de Logs de Atividades
const logsAtividadesTable = `
  CREATE TABLE IF NOT EXISTS logs_atividades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    atividade VARCHAR(255) NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
  );
`;

// Tabela de Tokens de Redefinição de Senha
const tokensRedefinicaoTable = `
  CREATE TABLE IF NOT EXISTS tokens_redefinicao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    prazo_de_validade TIMESTAMP NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
  );
`;

// Tabela para Tokens Revogados
const tokensRevogadosTable = `
  CREATE TABLE IF NOT EXISTS tokens_revogados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(500) NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// Função para criar as tabelas
const createTables = () => {
  connection.query(usuariosTable, (err) => {
    if (err) console.error('Erro ao criar a tabela usuarios:', err);
    else console.log('Tabela usuarios criada com sucesso.');
  });

  connection.query(tokensVerificacaoTable, (err) => {
    if (err) console.error('Erro ao criar a tabela tokens_verificacao:', err);
    else console.log('Tabela tokens_verificacao criada com sucesso.');
  });

  connection.query(logsAtividadesTable, (err) => {
    if (err) console.error('Erro ao criar a tabela logs_atividades:', err);
    else console.log('Tabela logs_atividades criada com sucesso.');
  });

  connection.query(tokensRedefinicaoTable, (err) => {
    if (err) console.error('Erro ao criar a tabela tokens_redefinicao:', err);
    else console.log('Tabela tokens_redefinicao criada com sucesso.');
  });

  connection.query(tokensRevogadosTable, (err) => {
    if (err) console.error('Erro ao criar a tabela tokens_revogados:', err);
    else console.log('Tabela tokens_revogados criada com sucesso.');
  });

  connection.end();
};

// Executa a criação das tabelas
createTables();
