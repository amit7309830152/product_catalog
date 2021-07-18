import { Db } from '../config/db';
import bcrypt from "bcryptjs";

const { DataTypes, Model } = require('sequelize');

interface IUser {
    id: number,
    name: string,
    mobile: number,
    password: string,
    email: string
}

// type newUser = Omit<IUser, 'id'>

export class User extends Model<IUser> implements IUser {
    id: number;
    name: string;
    mobile: number;
    password: string;
    email: string;

    constructor(user: IUser) {
        super()
        this.id = user.id
        this.name = user.name
        this.mobile = user.mobile
        this.password = user.password
        this.email = user.email
    }

    public static async getUser(mobile: number) {
        try {
            const resultDb = await User.findAll({
                where: {
                    mobile: mobile
                }
            })
            return resultDb
        } catch (error) {
            throw new Error(error);
        }
    }

    public static async getDetailByUserName(userName: string) {
        try {
            const user = await User.findAll({
                where: {
                    mobile: userName
                }
            })
            return user
        } catch (error) {
            throw new Error(error);
        }
    }
}

User.init({
    name: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    mobile: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
}, {
    sequelize: Db.dbConnect(),
    tableName: 'User',
    timestamps: false
});

