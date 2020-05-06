
exports.up = function(knex) {
    return knex.schema.createTable("sintomas_gastroint", table => {
        table.increments("codigo").primary()
        table.string("sintoma",1).notNull()       
        table.integer("frequencia").notNull()
        table.integer("duracao").notNull()                
        
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable("sintomas_gastroint")
};
