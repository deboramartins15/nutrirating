// CRIA A CONEXAO ATRAVES DO KNEX
const config = require('../knexfile.js');
const knex = require('knex')(config);

//CRIAÇÃO DAS TABELAS - knex migrate:latest
knex.migrate.latest([config]);
module.exports = knex;