import pool from "../config.js";

const getColumns = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT * FROM positioncolumns WHERE user_id = $1",
      [req.user.user_id]
    );
    res.json(response.rows);
  } catch (error) {
    console.error("Error al obtener las columnas:", error);
    return [];
  }
};

const updateColumnPosition = async (req, res) => {
  const { data } = req.body;

  try {
    // Eliminar todos los datos de la tabla
    await pool.query("DELETE FROM positioncolumns WHERE user_id = $1", [
      req.user.user_id,
    ]);

    // Reiniciar la secuencia del ID para que vuelva a empezar desde 1
    await pool.query(
      "SELECT setval(pg_get_serial_sequence('positioncolumns', 'id'), 1, false)"
    );

    // Insertar los nuevos datos de manera secuencial
    for (let item of data) {
      await pool.query(
        "INSERT INTO positioncolumns (column_id, user_id) VALUES ($1, $2)",
        [item.column_id, item.user_id]
      );
    }

    res.status(200).send("Datos eliminados e insertados correctamente");
  } catch (error) {
    // Si algo falla, deshacer la transacción
    console.error("Error en el controlador:", error);
    res.status(500).send("Error al eliminar e insertar datos");
  }
};

export { updateColumnPosition, getColumns };
