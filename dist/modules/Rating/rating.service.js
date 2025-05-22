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
exports.RatingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createRatingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isRatingExist = yield prisma_1.default.rating.findFirst({
        where: {
            userId: payload.userId,
            postId: payload.postId,
        },
    });
    if (isRatingExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You already rated this post");
    }
    const result = yield prisma_1.default.rating.create({
        data: payload,
    });
    return result;
});
const getAllRating = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.rating.findMany({
        include: {
            post: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    image: true,
                    createdAt: true,
                    updatedAt: true,
                }
            },
            user: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                }
            }
        }
    });
    return result;
});
const getSingleRating = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getSingleRatingresult = yield prisma_1.default.rating.findUniqueOrThrow({
        where: { id },
    });
    return getSingleRatingresult;
});
// -------get myrating-------------
const getMyRating = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized user');
    }
    ;
    const existingUser = yield prisma_1.default.user.findUnique({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email
        },
        select: {
            id: true,
        }
    });
    const result = yield prisma_1.default.rating.findMany({
        where: {
            userId: existingUser === null || existingUser === void 0 ? void 0 : existingUser.id
        }
    });
    return result;
});
exports.RatingService = {
    createRatingIntoDB,
    getAllRating,
    getSingleRating,
    getMyRating,
};
