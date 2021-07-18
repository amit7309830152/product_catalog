import { Request, Response, NextFunction, RequestHandler } from 'express'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/userModel";

export class UserController {
    public static async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            let password;
            if (!req.body.name) {
                return res.send(403).send({ status: false, message: ' name is missing' })
            }
            if (!req.body.mobile) {
                return res.send(403).send({ status: false, message: ' mobile is missing' })
            }
            if (!req.body.email) {
                return res.send(403).send({ status: false, message: ' email is missing' })
            }
            if (!req.body.password) {
                return res.send(403).send({ status: false, message: ' password is missing' })
            } else {
                password = await bcrypt.hash(req.body.password, 8);
            }
            const result = await User.create({ name: req.body.name, mobile: req.body.mobile, email: req.body.email, password: password })
            result.password = "***********";
            res.status(200).send({ status: true, message: 'New user created', result })
        } catch (error) {
            res.status(500).send({ status: false, message: 'Something went wrong', error: error.errors[0].message })
        }
    }

    public static async getUser(req: Request | any, res: Response, next: NextFunction) {
        try {
            const resultDb = await User.getUser(req.headers.tokenDetail.mobile)
            res.status(200).send({ status: true, message: 'success', data: resultDb })
        } catch (error) {
            res.status(500).send({ status: false, message: 'Something went wrong' })
        }
    }

    public static async login(req: Request | any, res: Response, next: NextFunction) {
        try {
            let userName: string = '';
            let password: string = '';
            if (!req.body.userName) {
                res.status(400).send({ status: false, message: 'user_name is missing' })
            } else {
                userName = req.body.userName
            }
            if (!req.body.password) {
                res.status(400).send({ status: false, message: 'password is missing' })
            } else {
                password = req.body.password
            }

            const user = await User.getDetailByUserName(userName)
            if (user.length == 0) {
                res.status(401).send({ status: false, message: 'User does not exist' })
            }
            const isMatch = await bcrypt.compare(password, user[0].password)
            if (isMatch) {
                var token = jwt.sign({
                    id: user[0].id,
                    mobile: user[0].mobile,
                }, 'secret', {
                    expiresIn: '2 days'
                });
                res.status(200).send({ status: true, message: 'success', data: { user_id: user[0].id, token: token } })
            } else {
                res.status(401).send({ status: false, message: 'Password is incorrect' })
            }
        } catch (error) {
            res.status(500).send({ status: false, message: 'Something went wrong', error })
        }
    }
}
