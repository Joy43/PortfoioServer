import { Router } from "express";
import { postControllers } from "./post.controller";
import validateRequest from "../../utils/validateRequest";
import { postValidation } from "./post.validation";


import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";
const route = Router();
route.post(
  "/",
  validateRequest(postValidation.postSchema),
  postControllers.createPost
);
route.post(
  "/many",
  validateRequest(postValidation.manyPostSchema),
  postControllers.createMany
);
// -------------all post-----------
route.get("/", postControllers.getAllPost);
// ---------get admin post--------------
route.get("/admin", auth(UserRole.ADMIN,UserRole.USER), postControllers.getAllPostByAdmin);
// ----------------get single post-------------
route.get("/:postId", postControllers.getSinglePost);
// --------------admin update post-------------------
route.put(
  "/:postId",
  postControllers.updatePost
);

export const postRoute = route;
