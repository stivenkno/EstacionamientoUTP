import pool from "../config.js";

export const getParks = async (req, res) => {
  try {
    const response1 = await pool.query(
      "SELECT * FROM parkuno WHERE estado = 'libre' ORDER BY id_park_1 ASC"
    );
    const response2 = await pool.query(
      "SELECT * FROM parkdos WHERE estado = 'libre' ORDER BY id_park_2 ASC"
    );
    const response3 = await pool.query(
      "SELECT * FROM parktres WHERE estado = 'libre' ORDER BY id_park_3 ASC"
    );
    const response4 = await pool.query(
      "SELECT * FROM parkcuatro WHERE estado = 'libre' ORDER BY id_park_4 ASC"
    );

    res.json({
      parkuno: response1.rows,
      parkdos: response2.rows,
      parktres: response3.rows,
      parkcuatro: response4.rows,
    });
  } catch (error) {
    console.error("Error al obtener los parques:", error);
    res.status(500).json({ message: "Error al obtener los parques" });
  }
};

export const updatePark = async (req, res) => {
  const { park_id, estado, park } = req.body;

  try {
    console.log(park);
    if (park == 1) {
      console.log(park_id);
      console.log(estado);
      await pool.query("UPDATE parkuno SET estado = $1 WHERE id_park_1 = $2", [
        estado,
        park_id,
      ]);
    } else if (park == 2) {
      await pool.query("UPDATE parkdos SET estado = $1 WHERE id_park_2 = $2", [
        estado,
        park_id,
      ]);
    } else if (park == 3) {
      await pool.query("UPDATE parktres SET estado = $1 WHERE id_park_3 = $2", [
        estado,
        park_id,
      ]);
    } else if (park == 4) {
      await pool.query(
        "UPDATE parkcuatro SET estado = $1 WHERE id_park_4 = $2",
        [estado, park_id]
      );
    }
    res.json({ message: "Parque actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el parque:", error);
    res.status(500).json({ message: "Error al actualizar el parque" });
  }
};
