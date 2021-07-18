import { Router, Request, Response } from "express";
const router = Router()
import { Auth } from '../middleware/auth';

// /* Import controller */

import { ProductController } from '../controller/productController';

// // Only / for create the product
router.post('/', Auth.auth, ProductController.createProduct);

// use always id as params
router.put('/', Auth.auth, ProductController.updateProduct);

// // To get the list 
router.get('/', Auth.auth, ProductController.listProduct);

// // only id to get the product
router.get('/:id', Auth.auth, ProductController.detailProduct);

export default router;