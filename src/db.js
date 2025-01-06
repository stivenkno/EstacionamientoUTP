const query = `
      CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Crear la tabla de columnas si no existe
CREATE TABLE IF NOT EXISTS columns (
    column_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    position INT NOT NULL,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE
);

-- Crear la tabla de tareas si no existe
CREATE TABLE IF NOT EXISTS tasks (
    task_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    position INT NOT NULL,
    column_id INT REFERENCES columns(column_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE
);

    `;

export default query;
