const { Op } = require('sequelize');
const { Product } = require("../../models");

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;

    const productos = await Product.findAll({
      where: {
        [Op.or]: [
          {
            productName: {
              [Op.iLike]: `%${query}%`, // Usar iLike para búsqueda sin distinguir mayúsculas
            },
          },
          {
            productCategory: {
              [Op.iLike]: `%${query}%`,
            },
          },
        ],
      },
    });

    res.json({
      data: productos,
      message: "Lista de productos encontrados",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || "Ocurrió un error",
      error: true,
      success: false,
    });
  }
};

module.exports = searchProduct;