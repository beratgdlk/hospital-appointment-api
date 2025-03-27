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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByEmail = exports.getUserById = exports.getAllUsers = void 0;
const schema_registry_1 = require("../schemas/schema.registry");
const user_service_1 = require("../services/user.service");
const error_middleware_1 = require("../middlewares/error.middleware");
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.getAllUsersService)();
        res.status(200).json({
            status: 'success',
            data: {
                users
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const user = yield (0, user_service_1.getUserByIdService)(id);
        if (!user) {
            next(new error_middleware_1.AppError('Kullanıcı bulunamadı', 404));
            return;
        }
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
const getUserByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const user = yield (0, user_service_1.getUserByEmailService)(email);
        if (!user) {
            next(new error_middleware_1.AppError('Kullanıcı bulunamadı', 404));
            return;
        }
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserByEmail = getUserByEmail;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = schema_registry_1.userCreateSchema.parse(req.body);
        const user = yield (0, user_service_1.createUserService)(userData);
        res.status(201).json({
            status: 'success',
            data: {
                user
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const userData = schema_registry_1.userUpdateSchema.parse(req.body);
        const user = yield (0, user_service_1.updateUserService)(id, userData);
        if (!user) {
            next(new error_middleware_1.AppError('Kullanıcı bulunamadı', 404));
            return;
        }
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const user = yield (0, user_service_1.deleteUserService)(id);
        if (!user) {
            next(new error_middleware_1.AppError('Kullanıcı bulunamadı', 404));
            return;
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
