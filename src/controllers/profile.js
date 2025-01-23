import pool from "../config.js";

const getProfile = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [req.user.user_id]
    );
    res.json(response.rows[0]);
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    res.status(500).json({ message: "Error al obtener el perfil" });
  }
};

const editProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    await pool.query(
      "UPDATE users SET username = $1, email = $2 WHERE user_id = $3",
      [username, email, req.user.user_id]
    );
    res.json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    res.status(500).json({ message: "Error al actualizar el perfil" });
  }
};

export { getProfile, editProfile };
