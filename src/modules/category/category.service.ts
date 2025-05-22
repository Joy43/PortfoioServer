
import { ProjectCategory } from "@prisma/client";
import prisma from "../../utils/prisma";

const createCategoty = async (payload: ProjectCategory) => {
  const isCategoryExist = await prisma.projectCategory.findUnique({
    where: { name: payload?.name },
  });
  if (isCategoryExist) {
    throw new Error("Category already exist");
  }
  const result = await prisma.projectCategory.create({
    data: payload,
  });
  return result;
};

const getAllCategory = async (paginateQuery: Record<string, unknown>) => {
  const { page = 1, limit = 10 } = paginateQuery;
  const skip = (Number(page) - 1) * Number(limit);
  const result = await prisma.projectCategory.findMany({
    take: Number(limit),
    skip,
  });
  return {
    data: result,
    meta: {
      total: await prisma.projectCategory.count({}),
      page: Number(page),
      limit: Number(limit),
      totalPage: Math.ceil((await prisma.projectCategory.count({})) / Number(limit)),
    },
  };
};

export const categoryServices = {
  createCategoty,
  getAllCategory,
};
