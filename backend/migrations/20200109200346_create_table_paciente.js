exports.up = function(knex) {
    return knex.schema.createTable("paciente", table => {
        table.increments("cod_pac").primary()
        table.string("nome",200).notNull()
        table.datetime("dt_nasc").notNull()
        table.string("cpf",15).notNull()
        table.string("sexo",1)
        table.string("endereco",500)
        table.string("telefone",45)
        table.string("demencia",1)
        table.string("diabetes",1)
        table.integer("cod_profissional").references("cod_profissional").inTable("profissional").notNull()
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable("paciente")
};
