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
exports.projectService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
const createProject = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.project.create({
        data: {
            title: payload.title,
            description: payload.description,
            languages: payload.languages,
            image: payload.image,
            githublink: payload.githublink,
            gitclient: payload.gitclient,
            gitserver: payload.gitserver,
            livelink: payload.livelink,
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
// ------------get all category---------------
const getAllproject = (paginateQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = paginateQuery;
    const skip = (Number(page) - 1) * Number(limit);
    console.log({ page, limit, skip });
    const result = yield prismaProvider_1.default.project.findMany({
        take: Number(limit),
        skip,
        orderBy: {
            createdAt: "desc",
        },
        include: {
            category: true,
            user: true,
        },
    });
    return {
        data: result,
        meta: {
            total: yield prismaProvider_1.default.post.count({}),
            page: Number(page),
            limit: Number(limit),
            totalPage: Math.ceil((yield prismaProvider_1.default.post.count({})) / Number(limit)),
        },
    };
});
// ----------update --------------
const Updateproject = (projectId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (Array.isArray(payload.languages)) {
        payload.languages = payload.languages.join(", ");
    }
    const result = yield prismaProvider_1.default.project.update({
        where: { id: projectId },
        data: payload
    });
    return result;
});
// --------delete bike-----------
const DeleteProject = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.project.delete({
        where: { id: projectId }
    });
    return result;
});
// ------------single project----------
const getSingleProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.project.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
            user: true,
        },
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "PoJECT not found");
    }
    return result;
});
exports.projectService = {
    createProject,
    getAllproject,
    Updateproject,
    DeleteProject,
    getSingleProject
};
