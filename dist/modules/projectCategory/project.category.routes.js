"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectcategoryRoute = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const projectcategory_controller_1 = require("./projectcategory.controller");
const projectcategory_validation_1 = require("./projectcategory.validation");
const route = (0, express_1.Router)();
route.get("/", projectcategory_controller_1.categoryControllers.getAllCategory);
route.post("/", (0, validateRequest_1.default)(projectcategory_validation_1.projectcategoryValidation.projectcreateCategorySchema), projectcategory_controller_1.categoryControllers.createCategory);
exports.projectcategoryRoute = route;
