
exports.up = function(knex) {
    return knex.schema.createTable("man", table => {
        table.increments("codigo").primary()
        table.datetime("data").notNull().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.float("resultado_total").notNull()
        table.float("resultado_triagem").notNull()
        table.float("resultado_avglobal").notNull()        
        table.integer("cod_pac").references("cod_pac").inTable("paciente").notNull()
        table.integer("cod_av_global").references("codigo").inTable("avaliacao_global").notNull()
        table.integer("cod_triagem").references("codigo").inTable("triagem").notNull()
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable("man")
};
