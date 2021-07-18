import jwt from "jsonwebtoken";
import { Router, Response, NextFunction } from "express";
import { Request } from 'express';

export class Auth {
    public static auth(req: Request | any, res: Response, next: NextFunction) {
        try {
            var token = req.headers.authorization.split(' ')[1];
            var decode = jwt.verify(token, 'secret');
            req.headers.tokenDetail = decode;
            next();
        } catch (error) {
            res.status(401).json({
                error: 'Token is invalid'
            });
        }
    }
}
