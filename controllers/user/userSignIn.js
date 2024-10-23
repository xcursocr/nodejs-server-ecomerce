const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Por favor proporcione correo electrónico");
    }
    if (!password) {
      throw new Error("Por favor proporcione contraseña");
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    // console.log("checkPassoword", checkPassword);

    if (checkPassword) {
      const tokenData = {
        id: user.id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 8,
      });

      const tokenOption = {
        httpOnly: true,
        secure: true,
      };

      res.cookie("token", token, tokenOption).status(200).json({
        message: "Inicio de sesión exitosamente",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Por favor verifique la contraseña");
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
