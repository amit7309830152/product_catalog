"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const productModel_1 = require("../model/productModel");
class ProductController {
    static async createProduct(req, res, next) {
        try {
            console.log({
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                qty: req.body.qty,
                maxQty: req.body.maxQty,
                minQty: req.body.minQty,
                isActive: 1
            });
            const product = await productModel_1.Product.create({
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                qty: req.body.qty,
                maxQty: req.body.maxQty,
                minQty: req.body.minQty,
                isActive: 1
            });
            res.status(200).send({ status: true, message: 'New product created', data: product });
        }
        catch (error) {
            res.status(500).send({ status: false, message: 'Something went wrong', error });
        }
    }
    static async updateProduct(req, res, next) {
        let productId;
        try {
            if (!req.body.productId) {
                res.status(400).send({ status: false, message: 'product id is missing' });
            }
            else {
                productId = req.body.productId;
            }
            const product = {};
            if (req.body.isActive) {
                product.isActive = req.body.isActive;
            }
            if (req.body.productId) {
                product.id = req.body.productId;
            }
            if (req.body.price) {
                product.price = req.body.price;
            }
            if (req.body.category) {
                product.category = req.body.category;
            }
            if (req.body.qty) {
                product.qty = req.body.qty;
            }
            if (req.body.maxQty) {
                product.maxQty = req.body.maxQty;
            }
            if (req.body.minQty) {
                product.minQty = req.body.minQty;
            }
            if (req.body.name) {
                product.name = req.body.name;
            }
            await productModel_1.Product.updateProduct(product);
            res.status(200).send({ status: true, message: 'Product status is updated' });
        }
        catch (error) {
            res.status(500).send({ status: false, message: 'Something went wrong', error });
        }
    }
    static async listProduct(req, res, next) {
        try {
            let pageNo = 1;
            let key = undefined;
            let priceRangeStart = 0;
            let priceRangeEnd = 0;
            if (req.query.key) {
                key = req.query.key;
            }
            if (req.query.priceRangeStart) {
                priceRangeStart = +req.query.priceRangeStart;
            }
            if (req.query.priceRangeEnd) {
                priceRangeEnd = +req.query.priceRangeEnd;
            }
            if (req.query.pageNo) {
                pageNo = +req.query.pageNo;
            }
            let productList = await productModel_1.Product.getList(+pageNo, key, priceRangeStart, priceRangeEnd);
            if (productList) {
                res.status(200).send({ status: true, message: 'New user data', data: { product_list: productList } });
            }
            else {
                res.status(404).send({ status: false, message: 'No product is found' });
            }
        }
        catch (error) {
            console.log('error', error);
            console.error(error);
            res.status(500).send({ status: false, message: 'Something went wrong' });
        }
    }
    static async detailProduct(req, res, next) {
        try {
            if (req.params.id) {
                const productDetail = await productModel_1.Product.getDetail(+req.params.id);
                if (productDetail) {
                    return res.status(200).send({ status: true, message: 'success', data: { product: productDetail } });
                }
                else {
                    return res.status(404).send({ status: false, message: 'No product is found with this product id' });
                }
            }
            else {
                return res.status(404).send({ status: false, message: 'Id is missing' });
            }
        }
        catch (error) {
            return res.status(500).send({ status: false, message: 'Something went wrong' });
        }
    }
}
exports.ProductController = ProductController;
