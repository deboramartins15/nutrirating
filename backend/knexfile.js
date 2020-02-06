const { db } = require('./.env');

// PARAMETRIZA O KNEX
module.exports = {
    client: 'postgresql',
    connection: db,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};
