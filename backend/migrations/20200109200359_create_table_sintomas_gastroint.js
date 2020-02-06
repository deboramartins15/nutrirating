
exports.up = function(knex) {
    return knex.schema.createTable("sintomas_gastroint", table => {
        table.increments("codigo").primary()
        table.string("nenhum",1).notNull()
        table.string("nausea",1).notNull()
        table.string("vomito",1).notNull()
        table.string("diarreia",1).notNull()
        table.string("anorexia",1).notNull()
        table.integer("duracao").notNull()                
        
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable("sintomas_gastroint")
};
