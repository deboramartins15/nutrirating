
exports.up = function(knex) {
    return knex.schema.createTable("historico_familiar", table => {
        table.increments("cod_historico").primary()
        table.string("descricao",300).notNull()
        table.string("parente",45)
        table.integer("cod_pac").references("cod_pac").inTable("paciente").notNull()
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable("historico_familiar")
};
