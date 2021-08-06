const {Sequelize} = require('sequelize');
const sequelize = require('../db/connection.js');
const User = require('./user');
const BlogEntry = require('./blogentry');

const Comment = sequelize.define('Comment', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        content: {
            type: Sequelize.STRING
        },

        createdBy: {
            type: Sequelize.INTEGER,
            references: {
                model: User,
                key: "id"
            }
        },

        commentOn: {
            type: Sequelize.INTEGER,
            references: {
                model: BlogEntry,
                key: "id"
            },
        },

        changedOn: {
            type: Sequelize.BIGINT,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    });

module.exports = Comment;
