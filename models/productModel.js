const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Product = sequelize.define(
  "Product",
  {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productBrand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productImage: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Array de imágenes
      allowNull: true,
    },
    productDescripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    productPrice: {
      type: DataTypes.DECIMAL(10, 2), // Decimales para precios
      allowNull: false,
    },
    productSelling: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: true, // Activa los timestamps
  }
);

// Definir la asociación
Product.associate = (models) => {
  Product.hasMany(models.AddToCart, { foreignKey: 'productId', as: 'cartItems' });
};
// Exporta el modelo
module.exports = Product;
