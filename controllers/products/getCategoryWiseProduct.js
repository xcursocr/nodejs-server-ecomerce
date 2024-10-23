const { Product } = require("../../models");
const getCategoryWiseProduct = async (req, res) => {
  try {
    const { category } = req.body || req.query;
    const products = await Product.findAll({
      where: { productCategory: category } // Ajusta el nombre del campo según tu modelo
    });

    res.json({
      data: products,
      message: "Productos",
      success: true,
      error: false
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "Error al obtener los productos",
      error: true,
      success: false
    });
  }
};

module.exports = getCategoryWiseProduct;