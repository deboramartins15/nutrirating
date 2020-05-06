
exports.up = function(knex) {
    return knex.schema.createTable("doencas_comorbidades", table => {
        table.increments("codigo").primary()
        table.string("diag_principal",500).notNull()
        table.string("comorbidades",500).notNull()
        table.string("requerimento",3).notNull()
        table.string("stress_metabol",3).notNull()                         
        
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable("doencas_comorbidades")
};
