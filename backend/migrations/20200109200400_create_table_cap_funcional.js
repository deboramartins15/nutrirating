
exports.up = function(knex) {
    return knex.schema.createTable("cap_funcional", table => {
        table.increments("codigo").primary()
        table.string("sem_alteracao",1).notNull()
        table.string("alteracao",1).notNull()
        table.string("tempo_alteracao",3).notNull()
        table.integer("duracao").notNull()                
        
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable("cap_funcional")
};
