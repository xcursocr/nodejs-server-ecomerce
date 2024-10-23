const Product = require("../../models/productModel")


const getProductController = async (req, res) => {
  try {
    const allProduct = await Product.findAll({
      order: [['createdAt', 'DESC']]
    });


    res.json({
      message: "Todos los Productos",
      success: true,
      error: false,
      data: allProduct
    })

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    })
  }

}

module.exports = getProductController