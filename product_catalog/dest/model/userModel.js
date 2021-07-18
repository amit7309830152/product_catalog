"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const db_1 = require("../config/db");
const { DataTypes, Model } = require('sequelize');
// type newUser = Omit<IUser, 'id'>
class User extends Model {
    constructor(user) {
        super();
        this.id = user.id;
        this.name = user.name;
        this.mobile = user.mobile;
        this.password = user.password;
        this.email = user.email;
    }
    static async getUser(mobile) {
        try {
            const resultDb = await User.findAll({
                where: {
                    mobile: mobile
                }
            });
            return resultDb;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    static async getDetailByUserName(userName) {
        try {
            const user = await User.findAll({
                where: {
                    mobile: userName
                }
            });
            return user;
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.User = User;
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
    sequelize: db_1.Db.dbConnect(),
    tableName: 'User',
    timestamps: false
});
