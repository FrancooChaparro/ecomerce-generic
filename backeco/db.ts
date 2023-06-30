 import { Sequelize } from "sequelize";
 import pg from "pg";
 import { initUser } from "./src/models/User";


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

  export const { User } = sequelize.models 
  

  
  
