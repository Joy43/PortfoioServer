"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const route = (0, express_1.Router)();
const modules = [
    { path: "/auth", route: auth_route_1.authRoute },
];
modules.forEach((module) => {
    route.use(module.path, module.route);
});
exports.default = route;
