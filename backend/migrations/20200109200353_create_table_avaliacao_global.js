
exports.up = function(knex) {
    return knex.schema.createTable("avaliacao_global", table => {
        table.increments("codigo").primary()
        table.string("vive_propria_casa",1).notNull()
        table.string("qtd_medicamentos",1).notNull()
        table.string("escaras_lesoes_pele",1).notNull()
        table.string("qtd_refeicao_dia",1).notNull()
        table.string("consumo_leite_derivados",1).notNull()
        table.string("consumo_leguminosas_ovos",1).notNull()
        table.string("consumo_proteina",1).notNull()
        table.float("somatorio_consumo").notNull()
        table.string("consumo_frutas_hortalicas",1).notNull()
        table.float("consumo_liquidos").notNull()
        table.string("modo_alimentacao",1).notNull()
        table.string("problema_nutricional",1).notNull()
        table.string("comparacao_faixa_etaria",1).notNull()
        table.float("perimetro_braquial").notNull()        
        table.string("perimetro_perna",1).notNull()                
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable("avaliacao_global")
};
