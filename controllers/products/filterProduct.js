const { Op } = require('sequelize');
const { Product } = require("../../models");


const filterProductController = async (req, res) => {
  try {
    const categoryList = req.body.category || [];

    const products = await Product.findAll({
      where: {
        productCategory: {
          [Op.in]: categoryList, // Usamos Op.in para filtrar por categorías
        },
      },
    });

    res.json({
      data: products,
      message: "Productos obtenidos con éxito.",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = filterProductController;