import { Model, DataTypes }  from 'sequelize';
import sequelize from '../db/connection';
import User from './user';
import BlogEntry from "./blogentry";

class Comment extends Model {}

Comment.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        content: {
            type: DataTypes.STRING
        },

        createdBy: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: "id"
            }
        },

        commentOn: {
            type: DataTypes.INTEGER,
            references: {
                model: BlogEntry,
                key: "id"
            },
        },

        changedOn: {
            type: DataTypes.BIGINT,
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

export = Comment;
