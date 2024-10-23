const { AddToCart } = require("../../models");

const deleteAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const addToCartProductId = req.body.id; // Cambia _id a id si es necesario

    const deleteProduct = await AddToCart.destroy({
      where: {
        id: addToCartProductId,
        userId: currentUserId // Asegúrate de que solo el usuario actual pueda eliminar su producto
      }
    });

    if (deleteProduct === 0) {
      return res.json({
        message: "Producto no encontrado en el carrito",
        error: true,
        success: false
      });
    }

    res.json({
      message: "Producto eliminado del carrito",
      error: false,
      success: true,
      data: deleteProduct
    });

  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false
    });
  }
}

module.exports = deleteAddToCartProduct;