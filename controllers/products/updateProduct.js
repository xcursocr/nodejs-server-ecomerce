const uploadProductPermission = require("../../helpers/permission");
const Product = require("../../models/productModel")


async function updateProductController(req, res) {
  try {

    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permiso denegado")
    }

    const { id, ...resBody } = req.body

    const updateProduct = await Product.update(resBody, {
      where: {
        id: id
      }
    });


    res.json({
      message: "Producto actualizado con éxito",
      data: updateProduct,
      success: true,
      error: false
    })

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    })
  }
}


module.exports = updateProductController