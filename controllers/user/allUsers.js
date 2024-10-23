const { User } = require("../../models");

async function allUsers(req, res) {
  try {
    // console.log("userid all Users", req.userId);

    const allUsers = await User.findAll({
      order: [
        ['role', 'ASC'], // Primero ordena por rol
        ['name', 'ASC']  // Luego por nombre
      ]
    });

    res.json({
      message: "Todos los usuarios ",
      data: allUsers,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = allUsers;
