"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const rating_controller_1 = require("./rating.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const prisma_1 = require("../../../generated/prisma");
const router = express_1.default.Router();
router.get("/", rating_controller_1.ratingController.getAllRating);
router.get("/:ratingId", rating_controller_1.ratingController.getSingleRating);
router.get("/my-rating", (0, auth_1.default)(prisma_1.UserRole.ADMIN, prisma_1.UserRole.PREMIUM, prisma_1.UserRole.USER), rating_controller_1.ratingController.getMyRating);
router.post("/", rating_controller_1.ratingController.createRatingIntoDB);
exports.ratingRoutes = router;
