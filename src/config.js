import knex from "knex";
import __dirname from './utils.js'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({
  path: path.resolve(__dirname,'../variables.env')
})

export const mariadb = knex({
    client: 'mysql',
    version: '10.4.22',
    connection: {
      host: process.env.HOST_DB,
      port: process.env.PORT_DB,
      user: process.env.USER_DB,
      password:process.env.PASSWORD_DB,
      database: process.env.DATABASE_NAME
    },
    pool:{min: 0, max:10}
})


