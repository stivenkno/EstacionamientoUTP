/*

ESTRUCTURA DEL PROYECTO

1. Node.js: Servidor de Backend
2. Express: Framework para Node.js
3. PostgreSQL: Base de Datos Relacional
4. bcrypt: Encriptación de Contraseñas
5. JWT: Autenticación y Autorización
6. Dotenv: Manejo de Enviroment Variables


1. Gestion de Cards

-Titulo
-Descripcion Marckdown

Caracteristicas:
-Los usuarios pueden modificar y eliminar CARDS
-Las CARDS pueden pasar a diferentes columnas

2. Gestión de Columns:
   - Los usuarios pueden crear, modificar y eliminar "columns".


3. Crear un sistema de autenticación y autorizacion
   - Implementar un sistema que asegure que solo el propietario de los recursos pueda modificarlos.
   - Implementar un sistema de registro y perfil de usuario que permita a los usuarios modificar su información personal.

4. Perfil de Usuario:
   - Los usuarios deben poder registrarse y gestionar su perfil.
   - El perfil de usuario debe incluir campos básicos de información personal y opciones de edición.



PRIMERA FASE DEL PROYECTO:

-Desarrollar la API REST que permita realizar todas las operaciones mencionadas en las características de la aplicación.

1. Cumplimiento de los Principios REST:
   - La API debe seguir los principios REST, asegurando una estructura consistente y entendible para la manipulación de recursos.

   PRINCIPIOS REST:

   - Representational State Transfer (REST)
   - Client-Server Architecture
   - Uniform Interface
   - Separation of Concerns

   -Identificacion de recursos: Cada recurso debe tener una unica URL
   -Manipulacion de recursos mediante representaciones: (JSON, XML, HTML)
   -Mensajes autodescriptivos: Cada mensaje contiene suficiente información para que el cliente lo entienda.

   STATELESS: La API debe ser un API REST sin estado, lo que significa que no debe mantener información entre las solicitudes de los clientes.



2. Manejo de Errores:
   - La API debe manejar errores de forma efectiva, proporcionando mensajes de error claros y adecuados códigos de estado HTTP.

   Codigos de estado mas importantes:

   - 200: OK
   - 201: Created
   - 400: Bad Request
   - 401: Unauthorized
   - 403: Forbidden
   - 404: Not Found
   - 500: Internal Server Error

3. Estándares de Seguridad:
   - Implementar medidas de seguridad para proteger la API de vulnerabilidades comunes como inyección de SQL, cross-site scripting (XSS) y ataques de fuerza bruta.
   - Asegurar que las contraseñas se almacenen de forma segura utilizando técnicas de hashing.

Restricciones Técnicas:

1. Sin Uso de ORMs:
   - La API debe interactuar directamente con la base de datos PostgreSQL sin utilizar Object-Relational Mappers (ORMs).

2. Autenticación y Autorización:
   - No se permite el uso de librerías de autenticación externas.
   - La autenticación debe implementarse usando JSON Web Tokens (JWT) o técnicas de hash para asegurar las contraseñas.
   - Las contraseñas no deben almacenarse en texto plano; deben ser hashadas utilizando un método seguro de hashing.

3. Protección de Endpoints:
   - Todos los endpoints de la API deben estar protegidos para que solo los usuarios autenticados puedan acceder y manipular los recursos.


*/

/*

PASOS PARA CONECTARSE A UNA BASE DE DATOS USANDO POSTGRESQL EN RENDER:

1. Crear una base de datos en PostgreSQL en Render.
2. Obtener la URL de la base de datos en Render.
3. Configurar la URL de la base de datos en el archivo .env de tu proyecto.

-Se crea en el archivo .env la variable de entorno con la URL de la base de datos
-Se realiza la conexion con la base de datos, como esta desplegada en render requiere ssl
const pool = new Pool({
  connectionString: DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

Nota: pg no soporta completamente ESMODULES

-Prueba de conexion a la base de datos

// Función para probar la conexión
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

*/

/*
Explicacion para mi:

Los controladores son los que manejan las peticiones y toda la logica, luego este se la pasa a las rutas, y luego al servidor.


Nos podemos conectar a pg admin Local desde render, con las credenciales que este nos proporciona:

-La url externa se puede utilizar desde prg... etc
-Tambien es posible agregar nuestra IP a render
*/
