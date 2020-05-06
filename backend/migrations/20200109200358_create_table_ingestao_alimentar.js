
exports.up = function(knex) {
    return knex.schema.createTable("ingestao_alimentar", table => {
        table.increments("codigo").primary()        
        table.string("mudanca",1).notNull()
        table.integer("tempo_mudanca").notNull()        
        table.string("tipo_dieta",3).notNull()        
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable("ingestao_alimentar")
};
