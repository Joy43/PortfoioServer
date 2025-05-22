import express from "express";
import { commentController } from "./comment.controller";
import validateRequest from "../../utils/validateRequest";
import { commentValidation } from "./comment.validation";
import { UserRole } from "@prisma/client";
import auth from "../../middleware/auth";



const router = express.Router();
router.get(
  "/my-comments",
  auth(UserRole.PREMIUM, UserRole.USER),
  commentController.getAllUsersComment
);
router.get("/", commentController.getAllComment);
router.get("/:commentId",
   commentController.getSingleCommentbyId);


router.post(
  "/",
  validateRequest(commentValidation.createCommentSchema),
  commentController.createCommentIntoDB
);



export const commentRoutes = router;
