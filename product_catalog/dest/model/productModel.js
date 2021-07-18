"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const db_1 = require("../config/db");
const sequelize_1 = require("sequelize");
const { DataTypes, Model } = require('sequelize');
class Product extends Model {
    constructor(product) {
        super();
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.category = product.category;
        this.qty = product.qty;
        this.maxQty = product.maxQty;
        this.minQty = product.minQty;
        this.isActive = product.isActive;
    }
    static async updateProduct(product) {
        try {
            Product.update(product, {
                where: {
                    id: product.id
                }
            });
            return 1;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    static async getDetail(id) {
        try {
            const productDetail = await Product.findAll({
                where: {
                    id: id
                }
            });
            return productDetail;
        }
        catch (error) {
            throw new Error('There is error in query');
        }
    }
    static async getList(page, key, price_1, price_2) {
        try {
            let offset = (page - 1) * 5;
            let limit = 5;
            let whereClause;
            if (key) {
                if (price_1 && price_2) {
                    whereClause = {
                        where: {
                            [sequelize_1.Op.and]: [
                                {
                                    [sequelize_1.Op.or]: [
                                        { name: { [sequelize_1.Op.like]: `%${key}%` } },
                                        { category: { [sequelize_1.Op.like]: `%${key}%` } }
                                    ]
                                },
                                {
                                    [sequelize_1.Op.and]: [
                                        { price: { [sequelize_1.Op.gte]: price_1 } },
                                        { price: { [sequelize_1.Op.lte]: price_2 } }
                                    ]
                                }
                            ],
                        },
                        offset: offset,
                        limit: limit
                    };
                }
                else {
                    whereClause = {
                        where: {
                            [sequelize_1.Op.or]: [
                                { name: { [sequelize_1.Op.like]: `%${key}%` } },
                                { category: { [sequelize_1.Op.like]: `%${key}%` } }
                            ]
                        },
                        offset: offset,
                        limit: limit
                    };
                }
            }
            else if (price_1 && price_2) {
                whereClause = {
                    where: {
                        [sequelize_1.Op.and]: [
                            { price: { [sequelize_1.Op.gte]: price_1 } },
                            { price: { [sequelize_1.Op.lte]: price_2 } }
                        ]
                    },
                    offset: offset,
                    limit: limit
                };
            }
            else {
                whereClause = {
                    offset: offset,
                    limit: limit
                };
            }
            const { count, rows } = await Product.findAndCountAll(whereClause);
            return { rows, count };
        }
        catch (error) {
            throw new Error('There is error in query');
        }
    }
}
exports.Product = Product;
Product.init({
    name: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DECIMAL
    },
    category: {
        type: DataTypes.STRING
    },
    qty: {
        type: DataTypes.INTEGER
    },
    maxQty: {
        type: DataTypes.NUMBER
    },
    minQty: {
        type: DataTypes.NUMBER
    },
    isActive: {
        type: DataTypes.NUMBER
    }
}, {
    sequelize: db_1.Db.dbConnect(),
    tableName: 'Product',
    timestamps: false
});
