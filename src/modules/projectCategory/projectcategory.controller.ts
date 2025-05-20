import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import pick from "../../utils/pick";
import { categoryServices } from "./projectcategory.service";
import prisma from "../../utils/prismaProvider";

const createCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.createProjectCategoty(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "project Category created successfully",
    data: result,
  });
});
const getAllCategory = catchAsync(async (req, res) => {
  const paginateQuery = pick(req.query, ["page", "limit"]);
  const result = await categoryServices.getAllCategory(paginateQuery);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "project Category retrived successfully",
    data: result?.data,
    meta: result?.meta,
  });
});

export const categoryControllers = {
  createCategory,
  getAllCategory,
};
