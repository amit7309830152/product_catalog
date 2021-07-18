"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../model/userModel");
class UserController {
    static async createUser(req, res, next) {
        try {
            let password;
            if (!req.body.name) {
                return res.send(403).send({ status: false, message: ' name is missing' });
            }
            if (!req.body.mobile) {
                return res.send(403).send({ status: false, message: ' mobile is missing' });
            }
            if (!req.body.email) {
                return res.send(403).send({ status: false, message: ' email is missing' });
            }
            if (!req.body.password) {
                return res.send(403).send({ status: false, message: ' password is missing' });
            }
            else {
                password = await bcryptjs_1.default.hash(req.body.password, 8);
            }
            const result = await userModel_1.User.create({ name: req.body.name, mobile: req.body.mobile, email: req.body.email, password: password });
            result.password = "***********";
            res.status(200).send({ status: true, message: 'New user created', result });
        }
        catch (error) {
            res.status(500).send({ status: false, message: 'Something went wrong', error: error.errors[0].message });
        }
    }
    static async getUser(req, res, next) {
        try {
            const resultDb = await userModel_1.User.getUser(req.headers.tokenDetail.mobile);
            res.status(200).send({ status: true, message: 'success', data: resultDb });
        }
        catch (error) {
            res.status(500).send({ status: false, message: 'Something went wrong' });
        }
    }
    static async login(req, res, next) {
        try {
            let userName = '';
            let password = '';
            if (!req.body.userName) {
                res.status(400).send({ status: false, message: 'user_name is missing' });
            }
            else {
                userName = req.body.userName;
            }
            if (!req.body.password) {
                res.status(400).send({ status: false, message: 'password is missing' });
            }
            else {
                password = req.body.password;
            }
            const user = await userModel_1.User.getDetailByUserName(userName);
            if (user.length == 0) {
                res.status(401).send({ status: false, message: 'User does not exist' });
            }
            const isMatch = await bcryptjs_1.default.compare(password, user[0].password);
            if (isMatch) {
                var token = jsonwebtoken_1.default.sign({
                    id: user[0].id,
                    mobile: user[0].mobile,
                }, 'secret', {
                    expiresIn: '2 days'
                });
                res.status(200).send({ status: true, message: 'success', data: { user_id: user[0].id, token: token } });
            }
            else {
                res.status(401).send({ status: false, message: 'Password is incorrect' });
            }
        }
        catch (error) {
            res.status(500).send({ status: false, message: 'Something went wrong', error });
        }
    }
}
exports.UserController = UserController;
