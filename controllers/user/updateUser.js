const { User } = require("../../models");


async function updateUser(req, res) {
  try {
    const sessionUser = req.userId;

    const { userId, email, name, role } = req.body;
    // console.log(userId);


    const payload = {
      ...(email && { email }),
      ...(name && { name }),
      ...(role && { role }),
    };

    // Busca el usuario por su ID
    const user = await User.findByPk(sessionUser);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
        error: true,
        success: false,
      });
    }
    // console.log("user.role", user.role);

    // Actualiza el usuario
    const [updatedCount] = await User.update(payload, {
      where: { id: userId },
    });

    if (updatedCount === 0) {
      return res.status(404).json({
        message: "No se realizaron cambios en el usuario",
        error: true,
        success: false,
      });
    }

    // Opcional: Puedes volver a obtener el usuario actualizado si lo deseas
    const updatedUser = await User.findByPk(userId);

    res.json({
      data: updatedUser,
      message: "Usuario actualizado",
      success: true,
      error: false,
    });
  } catch (err) {
    console.error(err); // Para depuración
    res.status(400).json({
      message: err.message || "Error desconocido",
      error: true,
      success: false,
    });
  }
}

module.exports = updateUser;

