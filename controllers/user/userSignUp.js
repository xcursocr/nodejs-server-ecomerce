const { User } = require("../../models");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    const user = await User.findOne({ where: { email } });

    // console.log("user", user);

    if (user) {
      throw new Error("El usuario ya existe.");
    }

    if (!email) {
      throw new Error("Por favor proporcione su correo electrónico");
    }
    if (!password) {
      throw new Error("Por favor proporcione su contraseña");
    }
    if (!name) {
      throw new Error("Por favor proporcione su nombre");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Algo salio mal");
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const saveUser = await User.create(payload);

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "Usuario creado con éxito!",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
