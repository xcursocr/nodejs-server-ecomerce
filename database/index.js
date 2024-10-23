const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL,
    dialect: process.env.DB_DIALECT,
    logging: console.log, // Agrega esta línea
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    // sequelize.sync();
    console.log("Conexion exitosa en la BASE de DATOS");
  } catch (error) {
    console.log(error);
    console.log("Hubo un error al conectarse a la DB");
  }
}

connectDB();

module.exports = sequelize;
