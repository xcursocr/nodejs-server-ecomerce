const { AddToCart } = require("../../models");

const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req.userId;

    // Contar los productos en el carrito para el usuario
    const count = await AddToCart.count({
      where: { userId: userId }
    });
    // console.log(count);

    res.json({
      data: {
        count: count
      },
      message: "Ok",
      error: false,
      success: true
    });
  } catch (error) {
    res.json({
      message: error.message || "Error inesperado.",
      error: true,
      success: false,
    });
  }
};

module.exports = countAddToCartProduct;
