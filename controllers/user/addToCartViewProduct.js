const { Product, AddToCart } = require("../../models");

const addToCartViewProduct = async (req, res) => {

  try {
    const currentUser = req.userId;


    const todosLosProductos = await AddToCart.findAll({
      where: { userId: currentUser },
      include: [
        {
          model: Product,
          as: 'product', // Este alias debe coincidir con el definido en la asociación
          attributes: ['id', 'productName', 'productPrice', 'productSelling', 'productImage'] // Ajusta según lo que necesites
        }
      ],
      order: [], // Esto evita el ordenamiento
    });

    // console.log("cartView", currentUser);

    // console.log("Todos los productos", todosLosProductos);

    res.json({
      data: todosLosProductos,
      success: true,
      error: false
    });

  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};

module.exports = addToCartViewProduct;