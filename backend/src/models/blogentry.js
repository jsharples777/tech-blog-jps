const {Sequelize} = require('sequelize');
const sequelize = require('../db/connection.js');
const User = require('./user');

const BlogEntry = sequelize.define('BlogEntry', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },

    title: {
        type: Sequelize.STRING,
        allowNull:false
    },

    content: {
        type: Sequelize.STRING
    },

    createdBy: {
        type: Sequelize.INTEGER,
        references: {
            model:User,
            key:"id"
        }
    },

    changedOn: {
        type: Sequelize.INTEGER,
        allowNull:false
    }

});

module.exports = BlogEntry;
