import express from "express";
import { ratingController } from "./rating.controller";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";


const router = express.Router();

router.get("/", ratingController.getAllRating);
router.get("/:ratingId", ratingController.getSingleRating);
router.get("/my-rating",auth(UserRole.ADMIN,UserRole.PREMIUM,UserRole.USER), ratingController.getMyRating);
router.post("/", ratingController.createRatingIntoDB);

export const ratingRoutes = router;
