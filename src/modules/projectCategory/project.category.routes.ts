import { Router } from "express";

import validateRequest from "../../utils/validateRequest";
import { categoryControllers } from "./projectcategory.controller";
import { projectcategoryValidation } from "./projectcategory.validation";


const route = Router();

route.get("/", categoryControllers.getAllCategory);
route.post(
  "/",
  validateRequest(projectcategoryValidation.projectcreateCategorySchema),
  categoryControllers.createCategory
);
export const projectcategoryRoute = route;
