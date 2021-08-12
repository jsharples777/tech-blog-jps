import {DataTypes, Model} from 'sequelize';
import sequelize from '../db/connection';

interface UserAttributes {
    id: number;
    username: string;
    password: string;
}

class User extends Model<UserAttributes> {}

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
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    });


export = User;

