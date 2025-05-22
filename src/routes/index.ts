import { Router } from "express";
import { authRoute } from "../modules/auth/auth.route";
import { Projectrouter } from "../modules/project/project.routes";
import { projectcategoryRoute } from "../modules/projectCategory/project.category.routes";
import { postRoute } from "../modules/post/post.route";


const route = Router();
const modules = [
  { path: "/auth", route: authRoute},
  {path:"/project",route:Projectrouter},
  {path:"/project-category",route:projectcategoryRoute},
  {path:"/blog",route:postRoute}
];

modules.forEach((module) => {
  route.use(module.path, module.route);
});

export default route;