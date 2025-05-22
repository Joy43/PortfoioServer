


import prisma from "../../utils/prisma";
import AppError from "../../errors/AppError";
import status from "http-status";
import { Post } from "@prisma/client";
// -------------create post--------------
const createPost = async (payload: Post) => {
  console.log("Upload", { payload });
  const result = await prisma.post.create({
data: {
    title: payload.title,
    location:payload.location,
    description: payload.description,
    language: payload.language,
    image: payload.image,
   
    category: {
      connect: { id: payload.categoryId }
    },
    user: {
      connect: { id: payload.userId }
    }
  }
  });
  return result;
};

const createMany = async (payload: Post[]) => {
  const result = await prisma.post.createMany({
    data: payload,
  });
  return result;
};
// ---------------all post get-------------
const getAllPost = async (
  query: Record<string, unknown>,
  paginateQuery: Record<string, unknown>
) => {
  const { searchTerm, ...fieldsValues } = query;
  const { page = 1, limit = 10 } = paginateQuery;

  const queryCondition: any[] = [];

  // Search by title, description, or category name
  if (searchTerm) {
    queryCondition.push({
      OR: [
        { title: { contains: searchTerm as string, mode: "insensitive" } },
        { description: { contains: searchTerm as string, mode: "insensitive" } },
        {
          category: {
            name: { contains: searchTerm as string, mode: "insensitive" },
          },
        },
      ],
    });
  }

  // Filter by other field values
  if (Object.keys(fieldsValues).length > 0) {
    queryCondition.push({
      AND: Object.keys(fieldsValues).map((key) => {
        if (key === "category") {
          return {
            category: {
              name: {
                equals: fieldsValues[key] as string,
              },
            },
          };
        }
        return {
          [key]: {
            equals: fieldsValues[key] as string | number | boolean,
          },
        };
      }),
    });
  }

  const whereCondition = queryCondition.length > 0 ? { AND: queryCondition } : {};

  const skip = (Number(page) - 1) * Number(limit);

  const result = await prisma.post.findMany({
    where: whereCondition,
    take: Number(limit),
    skip,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      ratings: true,
      votes: true,
      comments: true,
      user: true,
    },
  });

  const total = await prisma.post.count({ where: whereCondition });

  return {
    data: result,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
    },
  };
};

// ------------admin --------------
const getAllPostByAdmin = async (paginateQuery: Record<string, unknown>) => {
  const { page = 1, limit = 10 } = paginateQuery;
  const skip = (Number(page) - 1) * Number(limit);
  console.log({ page, limit, skip });
  const result = await prisma.post.findMany({
    take: Number(limit),
    skip,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      ratings: true,
      votes: true,
      comments: true,
      user: true,
    },
  });
  return {
    data: result,
    meta: {
      total: await prisma.post.count({}),
      page: Number(page),
      limit: Number(limit),
      totalPage: Math.ceil((await prisma.post.count({})) / Number(limit)),
    },
  };
};
// --------get single---------------
const getSinglePost = async (id: string) => {
  const result = await prisma.post.findUnique({
    where: {
      id,
     
    },
    include: {
      category: true,
      ratings: true,
      votes: true,
      comments: true,
      user: true,
    },
  });
  if (!result) {
    throw new AppError(status.NOT_FOUND, "Post not found");
  }
  return result;
};



// ----------update post-------------
const updatePost = async (id: string, payload: Partial<Post>) => {
  const isPostExist = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  if (!isPostExist) {
    throw new AppError(status.NOT_FOUND, "Post not found");
  }
  const result = await prisma.post.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
      ratings: true,
      votes: true,
      comments: true,
      user: true,
    },
  });

  return result;
};

// --------------update-----------


export const postServices = {
  createPost,
  createMany,
  getAllPost,
  getSinglePost,
  updatePost,
  getAllPostByAdmin,
}