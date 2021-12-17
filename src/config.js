import knex from "knex";
import __dirname from './utils.js'

export const sqlite = knex({
    client: "sqlite3",
    connection:{filename:__dirname+'/db/basedatos.sqlite'}
})

sqlite.schema.hasTable('Chat').then(resultado=>{
  if(!resultado){
      sqlite.schema.createTable('Chat', table=>{
          table.increments();
          table.string('usuario').notNullable();
          table.string('mensajes').notNullable();
          table.timestamps(true,true);
      })
      return(console.log("Tabla de Chat creada"))
  }else{
      return(console.log("ya esta la tabla"))
  }
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


