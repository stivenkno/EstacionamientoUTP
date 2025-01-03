import pkg from "pg";
const { Pool } = pkg;

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

pool.query("SELECT NOW()", (err, res) => {
  if (err) throw err;
  console.log(`Connected to the database at ${res.rows[0].now}`);
});

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
