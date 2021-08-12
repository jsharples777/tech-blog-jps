import { Model } from 'sequelize';
interface UserAttributes {
    id: number;
    username: string;
    password: string;
}
declare class User extends Model<UserAttributes> {
}
export = User;
