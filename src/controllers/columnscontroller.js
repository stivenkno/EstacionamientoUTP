import pool from "../config.js";

const readColumn = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM columns WHERE user_id = $1 ",
      [req.user.user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

const updateColumnPosition = async (req, res) => {
  const { data } = req.body;

  try {
    // Iniciar una transacción manual
    await pool.query("BEGIN");

    // Paso 1: Eliminar todos los datos para el user_id
    await pool.query("DELETE FROM columns WHERE user_id = $1", [
      req.user.user_id,
    ]);

    // Paso 2: Validar si hay duplicados en el array `data`
    const seenColumnIds = new Set();
    for (const item of data) {
      if (seenColumnIds.has(item.column_id)) {
        throw new Error(
          `El column_id '${item.column_id}' está duplicado en los datos proporcionados.`
        );
      }
      seenColumnIds.add(item.column_id);
    }

    // Paso 3: Insertar los nuevos datos secuencialmente
    for (let item of data) {
      await pool.query(
        "INSERT INTO columns (column_id, title, position, user_id) VALUES ($1, $2, $3, $4)",
        [item.column_id, item.title, item.position, item.user_id]
      );
    }

    // Confirmar la transacción
    await pool.query("COMMIT");

    res.status(200).send("Datos eliminados e insertados correctamente");
  } catch (error) {
    console.error("Error al actualizar las columnas:", error);

    // Revertir la transacción en caso de error
    try {
      await pool.query("ROLLBACK");
    } catch (rollbackError) {
      console.error("Error al realizar rollback:", rollbackError);
    }

    res
      .status(500)
      .send(error.message || "Error al eliminar e insertar datos en la tabla.");
  }
};

const createColumn = async (req, res) => {
  try {
    const { title, position } = req.body;
    await pool.query(
      "INSERT INTO columns (title, position, user_id) VALUES ($1, $2, $3)",
      [title, position, req.user.user_id]
    );
    res.send("Columna creada");
  } catch (err) {
    console.error(err);
    /**
     * Crea una columna en la base de datos
     *
     * @param {Object} req - Request de Express
     * @param {Object} res - Response de Express
     *
     * @prop {string} title - Titulo de la columna
     * @prop {number} position - Posicion de la columna
     *
     * @return {Promise<void>}
     */
    res.status(500).json({ message: err });
  }
};

const updateColumn = async (req, res) => {
  try {
    const { title, position } = req.body;
    await pool.query(
      "UPDATE columns SET title = $1, position = $2 WHERE column_id = $3 AND user_id = $4",
      [title, position, req.params.id, req.user.id]
    );
    res.send("Columna actualizada");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

const deleteColumn = async (req, res) => {
  const { column_id } = req.body;
  console.log(req.user.user_id);

  try {
    await pool.query(
      "DELETE FROM columns WHERE column_id = $1 AND user_id = $2",
      [column_id, req.user.user_id]
    );
    res.send("Columna eliminada");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

export {
  readColumn,
  createColumn,
  updateColumn,
  deleteColumn,
  updateColumnPosition,
};
