
exports.up = function(knex) {
    return knex.schema.createTable("medicamentos", table => {
        table.increments("cod_medicamento").primary()
        table.string("descricao",200).notNull()
        table.string("dosagem",45).notNull()
        table.string("intervalo",45)
        table.integer("cod_pac").references("cod_pac").inTable("paciente").notNull()
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable("medicamentos")
};
