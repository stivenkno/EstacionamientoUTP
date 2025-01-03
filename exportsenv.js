import dotenv from "dotenv";

dotenv.config();

const VAR_ENTORNO = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
};

export default VAR_ENTORNO;
