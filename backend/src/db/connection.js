"use strict";
const path = require("path");
const Sequelize = require("sequelize");
const dotenv = require('dotenv').config();

const env = process.env.MODE || "Development";
const config = require(path.join(__dirname, '../..', 'config', 'config.json'))[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = sequelize;
