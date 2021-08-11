//const Sequelize = require("sequelize");
//const dotenv = require('dotenv').config();
import Sequelize = require("sequelize");
import dotenv = require('dotenv');

dotenv.config();

// @ts-ignore
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
        decimalNumbers: true,
    },
});

//module.exports = sequelize;
export = sequelize;
