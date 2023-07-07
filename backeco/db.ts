 import { Sequelize } from "sequelize";
 import pg from "pg";
 import { initUser } from "./src/models/User";
 import { initProduct } from "./src/models/Product";
 import { initClient } from "./src/models/Client";

 const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;

export const sequelize = new Sequelize(
    `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`,
    {
      logging: false,
      native: false,
      dialectModule: pg,
    }
  );
  
  initUser(sequelize);
  initProduct(sequelize);
  initClient(sequelize);
  console.log(sequelize.models);
  
  export const { Client } = sequelize.models   
  export const { User } = sequelize.models 
  export const { product } = sequelize.models 

  User.hasOne(Client, {
    foreignKey: 'usuarioId' // Especifica el nombre de la clave foránea en la tabla "Info_adicional"
  });

  Client.belongsTo(User, {
    foreignKey: 'usuarioId' // Especifica el nombre de la clave foránea en la tabla "Info_adicional"
  });
  

  
  
