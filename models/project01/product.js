const Sequelize = require('sequelize');
const sequelize = require('../../util/project01/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  productName: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false
  },
  itemDescription: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;