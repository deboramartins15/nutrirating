
exports.up = function(knex) {
    return knex.schema.createTable("profissional", table => {
        table.increments("cod_profissional").primary()
        table.string("nome",200).notNull()
        table.string("email",200).notNull()
        table.datetime("dt_nasc")
        table.string("senha",200).notNull()
        table.string("confirmacao_senha",200).notNull()
        table.string("sexo",1)        
        table.string("telefone",45)
        table.string("conselho",45).notNull()
        table.string("num_conselho",45).notNull()        
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable("profissional")
};
