"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const auth_1 = require("../middleware/auth");
// /* Import controller */
const productController_1 = require("../controller/productController");
// // Only / for create the product
router.post('/', auth_1.Auth.auth, productController_1.ProductController.createProduct);
// use always id as params
router.put('/', auth_1.Auth.auth, productController_1.ProductController.updateProduct);
// // To get the list 
router.get('/', auth_1.Auth.auth, productController_1.ProductController.listProduct);
// // only id to get the product
router.get('/:id', auth_1.Auth.auth, productController_1.ProductController.detailProduct);
exports.default = router;
