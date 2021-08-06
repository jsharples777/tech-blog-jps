const {Sequelize} = require('sequelize');
const sequelize = require('../db/connection.js');

const User = sequelize.define('User', {

    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },

    username: {
        type: Sequelize.TEXT
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    last_login: {
        type: Sequelize.DATE
    },

    status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    });


module.exports = User;

