"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const morgan_1 = __importDefault(require("morgan"));
const port = 3000;
const app = express_1.default();
app.use(body_parser_1.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(morgan_1.default('dev'));
// postgresql check connection
// import { Db } from './config/db';
// Db.dbConnect().authenticate().then(() => {
//     console.log('Database connected by sequelize orm');
// }).catch((err: Error) => console.log('Error : ' + err))
/*
All the route files
*/
// userRoute
const userRoute_1 = __importDefault(require("./route/userRoute"));
// productRoute
const productRoute_1 = __importDefault(require("./route/productRoute"));
/*
Using the route in the app
 */
app.use('/user', userRoute_1.default);
app.use('/product', productRoute_1.default);
/*
Middleware to check any error
*/
app.use((err, req, res, next) => {
    if (err) {
        res.status(500).send({
            status: false,
            message: err.message
        });
    }
});
app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
});
