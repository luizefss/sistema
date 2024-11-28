// db/createTokensRevogadosTable.js
const connection = require('../config/db');

// Tabela para Tokens Revogados
const tokensRevogadosTable = `
  CREATE TABLE IF NOT EXISTS tokens_revogados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(500) NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// Executa a criação da tabela
connection.query(tokensRevogadosTable, (err) => {
  if (err) {
    console.error('Erro ao criar a tabela tokens_revogados:', err);
  } else {
    console.log('Tabela tokens_revogados criada com sucesso.');
  }
  connection.end();
});
