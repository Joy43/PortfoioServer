"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoute = void 0;
const express_1 = require("express");
const post_controller_1 = require("./post.controller");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const post_validation_1 = require("./post.validation");
const prisma_1 = require("../../../generated/prisma");
const auth_1 = __importDefault(require("../../middleware/auth"));
const route = (0, express_1.Router)();
route.post("/", (0, validateRequest_1.default)(post_validation_1.postValidation.postSchema), post_controller_1.postControllers.createPost);
route.post("/many", (0, validateRequest_1.default)(post_validation_1.postValidation.manyPostSchema), post_controller_1.postControllers.createMany);
// -------------all post-----------
route.get("/", post_controller_1.postControllers.getAllPost);
// ---------get admin post--------------
route.get("/admin", (0, auth_1.default)(prisma_1.UserRole.ADMIN), post_controller_1.postControllers.getAllPostByAdmin);
// ----------------get single post-------------
route.get("/:postId", post_controller_1.postControllers.getSinglePost);
// --------------admin update post-------------------
route.put("/:postId", post_controller_1.postControllers.updatePost);
exports.postRoute = route;
