"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const project_routes_1 = require("../modules/project/project.routes");
const project_category_routes_1 = require("../modules/projectCategory/project.category.routes");
const post_route_1 = require("../modules/post/post.route");
const route = (0, express_1.Router)();
const modules = [
    { path: "/auth", route: auth_route_1.authRoute },
    { path: "/project", route: project_routes_1.Projectrouter },
    { path: "/project-category", route: project_category_routes_1.projectcategoryRoute },
    { path: "/blog", route: post_route_1.postRoute }
];
modules.forEach((module) => {
    route.use(module.path, module.route);
});
exports.default = route;
