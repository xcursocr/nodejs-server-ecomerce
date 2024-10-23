const uploadProductPermission = require("../../helpers/permission");
const { Product } = require("../../models");

async function UploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permiso denegado");
    }

    const saveProduct = await Product.create(req.body);

    res.status(201).json({
      message: "Producto guardado exitosamente",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadProductController;
