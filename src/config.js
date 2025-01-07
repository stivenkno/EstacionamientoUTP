import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

import query from "./db.js";

import VAR_ENTORNO from "../exportsenv.js";

const DB_URL = VAR_ENTORNO.DB_URL;

//Conexion a la base de datos
const pool = new Pool({
  connectionString: DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

(async () => {
  try {
    const client = await pool.connect();
    console.log("Conexión exitosa a PostgreSQL");

    // Realizar una consulta de prueba
    const res = await client.query("SELECT NOW() AS current_time");
    console.log("Hora actual en la base de datos:", res.rows[0].current_time);

    client.release(); // Liberar el cliente
  } catch (err) {
    console.error("Error al conectar a PostgreSQL:", err);
  }
})();

const createTables = async () => {
  try {
    await pool.query(query);
    console.log("Initial tables created.");
  } catch (err) {
    console.error("Error creating table:", err);
  }
};

createTables();

export default pool;
