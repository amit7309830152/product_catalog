"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const auth_1 = require("../middleware/auth");
/* Import controller */
const userController_1 = require("../controller/userController");
router.post('/', userController_1.UserController.createUser);
router.post('/login', userController_1.UserController.login);
router.get('/', auth_1.Auth.auth, userController_1.UserController.getUser);
exports.default = router;
