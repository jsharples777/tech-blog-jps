import { Model, DataTypes }  from 'sequelize';
import sequelize from '../db/connection';

class User extends Model {}

User.init({

    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },

    username: {
        type: DataTypes.TEXT
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    last_login: {
        type: DataTypes.DATE
    },

    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    });


//module.exports = User;
export = User;

