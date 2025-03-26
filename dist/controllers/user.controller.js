"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const user_service_1 = require("../services/user.service");
const error_middleware_1 = require("../middlewares/error.middleware");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.getAllUsersService)();
        res.status(200).json({
            status: 'success',
            data: users,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, user_service_1.getUserByIdService)(Number(id));
        if (!user) {
            throw new error_middleware_1.AppError('User not found', 404);
        }
        res.status(200).json({
            status: 'success',
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield (0, user_service_1.getUserByEmailService)(req.body.email);
        if (existingUser) {
            throw new error_middleware_1.AppError('A user with this email already exists', 400);
        }
        // Hash password
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
        const userData = Object.assign(Object.assign({}, req.body), { password: hashedPassword });
        const newUser = yield (0, user_service_1.createUserService)(userData);
        res.status(201).json({
            status: 'success',
            data: newUser,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingUser = yield (0, user_service_1.getUserByIdService)(Number(id));
        if (!existingUser) {
            throw new error_middleware_1.AppError('User not found', 404);
        }
        if (req.body.email && req.body.email !== existingUser.email) {
            const userWithEmail = yield (0, user_service_1.getUserByEmailService)(req.body.email);
            if (userWithEmail) {
                throw new error_middleware_1.AppError('A user with this email already exists', 400);
            }
        }
        // Hash password if it's being updated
        if (req.body.password) {
            req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
        }
        const updatedUser = yield (0, user_service_1.updateUserService)(Number(id), req.body);
        res.status(200).json({
            status: 'success',
            data: updatedUser,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingUser = yield (0, user_service_1.getUserByIdService)(Number(id));
        if (!existingUser) {
            throw new error_middleware_1.AppError('User not found', 404);
        }
        yield (0, user_service_1.deleteUserService)(Number(id));
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
