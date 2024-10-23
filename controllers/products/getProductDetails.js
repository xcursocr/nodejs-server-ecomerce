const { Product } = require("../../models");

const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body; // Asegúrate de que productId se envíe en el cuerpo de la solicitud

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
        error: true,
        success: false,
      });
    }

    res.json({
      data: product,
      message: "Ok",
      success: true,
      error: false
    });

  } catch (err) {
    res.status(500).json({
      message: err.message || "Error al obtener los detalles del producto",
      error: true,
      success: false
    });
  }
};

module.exports = getProductDetails;