import express from "express";
import router from "./routes/userRoute";
import routerCursos from "./routes/cursosRoute";
import cors from 'cors'
import color from "colors";
import env from 'dotenv'
const app = express();
env.config()//facilitar la lectura de variables de entorno

app.use(express.json());

app.use(cors())
app.listen(3000, () => 
  console.log( color.green.bold("Server is running on port 3000"))
);


app.use("/user", router);
app.use("/cursos", routerCursos);
