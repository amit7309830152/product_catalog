"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Auth {
    static auth(req, res, next) {
        try {
            var token = req.headers.authorization.split(' ')[1];
            var decode = jsonwebtoken_1.default.verify(token, 'secret');
            req.headers.tokenDetail = decode;
            next();
        }
        catch (error) {
            res.status(401).json({
                error: 'Token is invalid'
            });
        }
    }
}
exports.Auth = Auth;
