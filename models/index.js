// models/index.js
const sequelize = require("../database"); // Asegúrate de que esto apunte a tu conexión
const AddToCart = require("./cartProductModel");
const Product = require("./productModel");
const User = require("./userModel");

// Definición de asociaciones
AddToCart.associate = (models) => {
  AddToCart.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
}, {
  defaultScope: {
    order: [] // Asegúrate de que esté vacío
  }
}



Product.associate = (models) => {
  Product.hasMany(models.AddToCart, { foreignKey: 'productId', as: 'cartItems' });
};

// Agrupar modelos
const models = {
  AddToCart,
  Product,
  User,
};

// Inicializar asociaciones
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Exportar modelos y sequelize
module.exports = { ...models, sequelize };

