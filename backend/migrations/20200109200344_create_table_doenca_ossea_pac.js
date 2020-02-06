
exports.up = function(knex) {
    return knex.schema.createTable("doenca_ossea_pac", table => {
        table.increments("codigo").primary()
        table.string("descricao",200).notNull()
        table.integer("cod_pac").references("cod_pac").inTable("paciente").notNull()
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable("doenca_ossea_pac")
};
