const { AddToCart } = require("../../models");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.userId;

    // console.log("productId:", productId);
    // console.log("currentUser:", currentUser);
    // Verifica si el producto ya está en el carrito
    const isProductAvailable = await AddToCart.findOne({
      where: { productId, userId: currentUser }
    });

    // console.log("isProductAvailable:", isProductAvailable);

    if (isProductAvailable) {
      return res.json({
        message: "Ya existe en el carrito.",
        success: false,
        error: true
      });
    }

    // Crea un nuevo elemento para el carrito
    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = await AddToCart.create(payload); // Usa create en lugar de instanciar el modelo

    return res.json({
      data: newAddToCart,
      message: "Producto añadido al carrito.",
      success: true,
      error: false
    });

  } catch (err) {
    res.json({
      message: err.message || "Error inesperado.",
      error: true,
      success: false
    });
  }
};

module.exports = addToCartController;