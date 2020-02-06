
exports.up = function(knex) {
  return knex.schema.createTable("responsavel", table => {
      table.increments("cod_resp").primary()
      table.string("nome",200).notNull()
      table.string("email",100)
      table.string("telefone",45)
      table.integer("cod_pac").references("cod_pac").inTable("paciente").notNull()
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("responsavel");
};
