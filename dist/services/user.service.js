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
exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getUserByEmailService = exports.getUserByIdService = exports.getAllUsersService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
/**
 * Tüm kullanıcıları getirir
 * @returns Tüm kullanıcılar
 */
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findMany({
        include: {
            doctor: true,
        },
    });
});
exports.getAllUsersService = getAllUsersService;
/**
 * ID'ye göre kullanıcı getirir
 * @param id Kullanıcı ID'si
 * @returns Kullanıcı
 */
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({
        where: { id },
        include: {
            doctor: true,
        },
    });
});
exports.getUserByIdService = getUserByIdService;
/**
 * E-posta adresine göre kullanıcı getirir
 * @param email E-posta adresi
 * @returns Kullanıcı
 */
const getUserByEmailService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({
        where: { email },
        include: {
            doctor: true,
        },
    });
});
exports.getUserByEmailService = getUserByEmailService;
/**
 * Yeni kullanıcı oluşturur
 * @param data Kullanıcı verileri
 * @returns Oluşturulan kullanıcı
 */
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(userData.password, salt);
    return yield prisma.user.create({
        data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: hashedPassword,
            role: userData.role, // Convert to Enum type
        },
        include: {
            doctor: true,
        },
    });
});
exports.createUserService = createUserService;
/**
 * Kullanıcı günceller
 * @param id Kullanıcı ID'si
 * @param data Güncelleme verileri
 * @returns Güncellenen kullanıcı
 */
const updateUserService = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const updateData = Object.assign({}, userData);
    if (userData.password) {
        const salt = yield bcrypt_1.default.genSalt(10);
        updateData.password = yield bcrypt_1.default.hash(userData.password, salt);
    }
    if (userData.role) {
        updateData.role = userData.role; // Convert to Enum type
    }
    return yield prisma.user.update({
        where: { id },
        data: updateData,
        include: {
            doctor: true,
        },
    });
});
exports.updateUserService = updateUserService;
/**
 * Kullanıcı siler
 * @param id Kullanıcı ID'si
 * @returns Silinen kullanıcı
 */
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.delete({
        where: { id },
        include: {
            doctor: true,
        },
    });
});
exports.deleteUserService = deleteUserService;
