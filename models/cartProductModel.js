const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const AddToCart = sequelize.define(
  "AddToCart",
  {

    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }

  },
  {
    timestamps: true, // Activa los timestamps
  }
);

// Definir la asociación
AddToCart.associate = (models) => {
  AddToCart.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
};
// Exporta el modelo
module.exports = AddToCart;
