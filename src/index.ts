import express from "express";
import router from "./routes/userRoute";
import color from "colors";
const app = express();


app.use(express.json());


app.listen(3000, () => 
  console.log( color.green.bold("Server is running on port 3000"))
);


app.use("/user", router);
