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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postServices = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
// -------------create post--------------
const createPost = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Upload", { payload });
    const result = yield prisma_1.default.post.create({
        data: {
            title: payload.title,
            location: payload.location,
            description: payload.description,
            language: payload.language,
            image: payload.image,
            category: {
                connect: { id: payload.categoryId }
            },
            user: {
                connect: { id: payload.userId }
            }
        }
    });
    return result;
});
const createMany = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.post.createMany({
        data: payload,
    });
    return result;
});
// ---------------all post get-------------
const getAllPost = (query, paginateQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = query, fieldsValues = __rest(query, ["searchTerm"]);
    const { page = 1, limit = 10 } = paginateQuery;
    const queryCondition = [];
    // Search by title, description, or category name
    if (searchTerm) {
        queryCondition.push({
            OR: [
                { title: { contains: searchTerm, mode: "insensitive" } },
                { description: { contains: searchTerm, mode: "insensitive" } },
                {
                    category: {
                        name: { contains: searchTerm, mode: "insensitive" },
                    },
                },
            ],
        });
    }
    // Filter by other field values
    if (Object.keys(fieldsValues).length > 0) {
        queryCondition.push({
            AND: Object.keys(fieldsValues).map((key) => {
                if (key === "category") {
                    return {
                        category: {
                            name: {
                                equals: fieldsValues[key],
                            },
                        },
                    };
                }
                return {
                    [key]: {
                        equals: fieldsValues[key],
                    },
                };
            }),
        });
    }
    const whereCondition = queryCondition.length > 0 ? { AND: queryCondition } : {};
    const skip = (Number(page) - 1) * Number(limit);
    const result = yield prisma_1.default.post.findMany({
        where: whereCondition,
        take: Number(limit),
        skip,
        orderBy: {
            createdAt: "desc",
        },
        include: {
            category: true,
            ratings: true,
            votes: true,
            comments: true,
            user: true,
        },
    });
    const total = yield prisma_1.default.post.count({ where: whereCondition });
    return {
        data: result,
        meta: {
            total,
            page: Number(page),
            limit: Number(limit),
        },
    };
});
// ------------admin --------------
const getAllPostByAdmin = (paginateQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = paginateQuery;
    const skip = (Number(page) - 1) * Number(limit);
    console.log({ page, limit, skip });
    const result = yield prisma_1.default.post.findMany({
        take: Number(limit),
        skip,
        orderBy: {
            createdAt: "desc",
        },
        include: {
            category: true,
            ratings: true,
            votes: true,
            comments: true,
            user: true,
        },
    });
    return {
        data: result,
        meta: {
            total: yield prisma_1.default.post.count({}),
            page: Number(page),
            limit: Number(limit),
            totalPage: Math.ceil((yield prisma_1.default.post.count({})) / Number(limit)),
        },
    };
});
// --------get single---------------
const getSinglePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.post.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
            ratings: true,
            votes: true,
            comments: true,
            user: true,
        },
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found");
    }
    return result;
});
// ----------update post-------------
const updatePost = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isPostExist = yield prisma_1.default.post.findUnique({
        where: {
            id,
        },
    });
    if (!isPostExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found");
    }
    const result = yield prisma_1.default.post.update({
        where: {
            id,
        },
        data: payload,
        include: {
            category: true,
            ratings: true,
            votes: true,
            comments: true,
            user: true,
        },
    });
    return result;
});
// --------------update-----------
exports.postServices = {
    createPost,
    createMany,
    getAllPost,
    getSinglePost,
    updatePost,
    getAllPostByAdmin,
};
