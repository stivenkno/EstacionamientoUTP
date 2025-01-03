import express from "express";
import VAR_ENTORNO from "../exportsenv.js";
import cors from "cors";
import pool from "./config.js";
import authrouter from "./routes/authroutes.js";

const PORT = VAR_ENTORNO.PORT;
const DB_URL = VAR_ENTORNO.DB_URL;

//Crea una instancia de express para el servidor
const app = express();

app.use(express.json());
app.use(cors());

if (pool) {
  console.log("Base de datos funcionando en servidor");
}

app.use("/api", authrouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
