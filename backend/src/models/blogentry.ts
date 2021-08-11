// const Sequelize = require('sequelize');
// const sequelize = require('../db/connection.ts');
// const User = require('./user');
import Sequelize = require('sequelize');
import sequelize = require('../db/connection.js');
import User = require('./user');

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
        type: Sequelize.BIGINT,
        allowNull:false
    }

},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blogentry',
    });

//module.exports = BlogEntry;
export = BlogEntry;
