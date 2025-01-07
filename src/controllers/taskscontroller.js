import pool from "../config.js";

const createTask = async (req, res) => {
  try {
    const { title, description, position, column_id } = req.body;
    await pool.query(
      "INSERT INTO tasks (title, description, position, column_id, user_id) VALUES ($1, $2, $3, $4, $5)",
      [title, description, position, column_id, req.user.user_id]
    );
    res.send("Tarea creada");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

const readTasks = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY position",
      [req.user.user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, position, column_id } = req.body;
    await pool.query(
      "UPDATE tasks SET title = $1, description = $2, position = $3, column_id = $4 WHERE id = $5 AND user_id = $6",
      [title, description, position, column_id, req.params.id, req.user.user_id]
    );
    res.send("Tarea actualizada");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

const deleteTask = async (req, res) => {
  try {
    await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2", [
      req.params.id,
      req.user.user_id,
    ]);
    res.send("Tarea eliminada");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

export { createTask, readTasks, updateTask, deleteTask };
