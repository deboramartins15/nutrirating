
exports.up = function(knex) {
    return knex.schema.createTable("asg", table => {
        table.increments("codigo").primary()
        table.datetime("data").notNull().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.string("resultado",50).notNull()
        table.integer("cod_pac").references("cod_pac").inTable("paciente").notNull()
        table.integer("cod_peso").references("codigo").inTable("peso").notNull()
        table.integer("cod_IA").references("codigo").inTable("ingestao_alimentar").notNull()
        table.integer("cod_SG").references("codigo").inTable("sintomas_gastroint").notNull()
        table.integer("cod_CF").references("codigo").inTable("cap_funcional").notNull()
        table.integer("cod_EF").references("codigo").inTable("exame_fisico").notNull()
        table.integer("cod_DC").references("codigo").inTable("doencas_comorbidades").notNull()

      })
};

exports.down = function(knex) {
  return knex.schema.dropTable("asg")
};
