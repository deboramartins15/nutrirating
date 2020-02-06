
exports.up = function(knex) {
    return knex.schema.createTable("peso", table => {
        table.increments("codigo").primary()
        table.float("peso_anterior").notNull()
        table.float("peso_atual").notNull()
        table.float("perda_peso").notNull()
        table.string("mudanca_peso",50).notNull()        
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable("peso")
};
