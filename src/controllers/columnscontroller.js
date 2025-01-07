import pool from "../config.js";

const readColumn = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM columns WHERE user_id = $1 ORDER BY position",
      [req.user.user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
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
  try {
    await pool.query(
      "DELETE FROM columns WHERE column_id = $1 AND user_id = $2",
      [req.params.id, req.user.id]
    );
    res.send("Columna eliminada");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

export { readColumn, createColumn, updateColumn, deleteColumn };
