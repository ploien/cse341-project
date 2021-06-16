const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '1Adk@16asf#4sd', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;