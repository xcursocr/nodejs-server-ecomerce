const sequelize = require("../../database");
const { Product } = require("../../models");


const getCategoryProduct = async (req, res) => {
  try {
    // Obtener las categorías únicas
    const categories = await Product.findAll({
      attributes: [
        [
          sequelize.fn("DISTINCT", sequelize.col("productCategory")),
          "productCategory",
        ],
      ],
    });

    // console.log(categories);

    const productByCategory = [];

    for (const categoryObj of categories) {
      const category = categoryObj.getDataValue("productCategory");
      const product = await Product.findOne({
        where: { productCategory: category },
      });

      if (product) {
        productByCategory.push(product);
      }
    }

    res.json({
      message: "Productos por categorias",
      data: productByCategory,
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
};

module.exports = getCategoryProduct;
