require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./database");
const cookieParser = require("cookie-parser");
const router = require("./routes");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = 5000 || process.env.PORT;
// actualizando fichero desde github

//database connection
// { alter: true }
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("connnect to DB");
    console.log("Server is running " + PORT);
  });
});

// sequelize.sync(); // solo crea las tablas. usar para produccion
// sequelize.sync({ alter: true }); //actuualiza tabla cualquier cambio sin afectar los registros
// sequelize.sync({force:true}) // elimina de nuevo las tablas y registros y la vuelve a crear
