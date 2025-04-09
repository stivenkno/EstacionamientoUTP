const query = `
      CREATE TABLE IF NOT EXISTS users (
          user_id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      

      CREATE TABLE IF NOT EXISTS parkuno (
          id_park_1 SERIAL PRIMARY KEY,
          estado VARCHAR(255)
      );

      CREATE TABLE IF NOT EXISTS parkdos (
          id_park_2 SERIAL PRIMARY KEY,
          estado VARCHAR(255)
      );

      CREATE TABLE IF NOT EXISTS parktres (
          id_park_3 SERIAL PRIMARY KEY,
          estado VARCHAR(255)
      );

      CREATE TABLE IF NOT EXISTS parkcuatro (
          id_park_4 SERIAL PRIMARY KEY,
          estado VARCHAR(255)
      );

      DO $$ 
      DECLARE 
          i INT;
      BEGIN
          -- Insertar datos en parkuno solo si está vacío
          IF NOT EXISTS (SELECT 1 FROM parkuno) THEN
              FOR i IN 1..200 LOOP
                  INSERT INTO parkuno (estado) VALUES ('libre');
              END LOOP;
          END IF;

          -- Insertar datos en parkdos solo si está vacío
          IF NOT EXISTS (SELECT 1 FROM parkdos) THEN
              FOR i IN 1..200 LOOP
                  INSERT INTO parkdos (estado) VALUES ('libre');
              END LOOP;
          END IF;

          -- Insertar datos en parktres solo si está vacío
          IF NOT EXISTS (SELECT 1 FROM parktres) THEN
              FOR i IN 1..200 LOOP
                  INSERT INTO parktres (estado) VALUES ('libre');
              END LOOP;
          END IF;

          -- Insertar datos en parkcuatro solo si está vacío
          IF NOT EXISTS (SELECT 1 FROM parkcuatro) THEN
              FOR i IN 1..200 LOOP
                  INSERT INTO parkcuatro (estado) VALUES ('libre');
              END LOOP;
          END IF;
      END $$;
`;

export default query;
