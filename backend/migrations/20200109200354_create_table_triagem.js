
exports.up = function(knex) {
    return knex.schema.createTable("triagem", table => {
        table.increments("codigo").primary()
        table.string("diminuicao_ingestao_alimentar",1).notNull()       
        table.string("perda_peso",1).notNull()       
        table.string("mobilidade",1).notNull()       
        table.string("stress_psicologico",1).notNull()       
        table.string("doenca_neuropsic",1).notNull()       
        table.string("imc",1).notNull()               
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable("triagem")
};
