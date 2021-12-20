import knex from "knex";
import __dirname from './utils.js'

export const sqlite = knex({
    client: "sqlite3",
    connection: { filename: __dirname + '/db/basedatos.sqlite' }
})

export const mariadb = knex({
    client: 'mysql',
    version: '10.4.22',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password:'',
      database: 'mibase'
    },
    pool:{min: 0, max:10}
})


