"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validate_1 = __importDefault(require("../middlewares/validate"));
const schema_registry_1 = require("../schemas/schema.registry");
const router = (0, express_1.Router)();
// Admin only routes
router.get('/', user_controller_1.getAllUsers);
router.get('/:id', user_controller_1.getUserById);
router.get('/email/:email', user_controller_1.getUserByEmail);
router.post('/', (0, validate_1.default)(schema_registry_1.userCreateSchema), user_controller_1.createUser);
router.put('/:id', (0, validate_1.default)(schema_registry_1.userUpdateSchema), user_controller_1.updateUser);
router.delete('/:id', user_controller_1.deleteUser);
exports.default = router;
