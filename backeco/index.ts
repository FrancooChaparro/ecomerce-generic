import dotenv from "dotenv";
dotenv.config()
import express from "express";
import cors from "cors";
import router from "./src/routes/index";
import { sequelize as db } from "./db";


const app = express();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/", router)


//conexiones
const PORT = process.env.PORT

db.sync({ force: false }).then(() => { 
  console.log("db connected");

  app.listen(PORT, ()=> { 
    console.log(`Server running on PORT ${PORT}`);
  });
})

