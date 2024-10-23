const { AddToCart } = require("../../models");

const updateAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const addToCartProductId = req.body.id;
    const qty = req.body.quantity;

    // Encuentra el producto en el carrito
    const [updated] = await AddToCart.update(
      { quantity: qty }, // Campos a actualizar
      {
        where: {
          id: addToCartProductId, // ID del producto en el carrito
          userId: currentUserId // Asegúrate de que pertenezca al usuario correcto
        }
      },
    );

    if (updated) {
      res.json({
        message: "Producto actualizado",
        data: { id: addToCartProductId, quantity: qty },
        error: false,
        success: true
      });
    } else {
      res.status(404).json({
        message: "Producto no encontrado",
        error: true,
        success: false
      });
    }

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};

module.exports = updateAddToCartProduct;