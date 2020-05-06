
exports.up = function(knex) {
    return knex.schema.createTable("exame_fisico", table => {
        table.increments("codigo").primary()
        table.string("red_gord_subcut",1).notNull()
        table.string("perda_muscular",1).notNull()
        table.string("edema",1).notNull()                   
        
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable("exame_fisico")
};
