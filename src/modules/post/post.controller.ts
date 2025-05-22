import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { postServices } from "./post.service";
import pick from "../../utils/pick";
import { JwtPayload } from "jsonwebtoken";
// ----------crete post------------
const createPost = catchAsync(async (req, res) => {
  const result = await postServices.createPost(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Post created successfully",
    data: result,
  });
});
const createMany = catchAsync(async (req, res) => {
  const result = await postServices.createMany(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Posts created successfully",
    data: result,
  });
});

// ----------get all post--------------
const getAllPost = catchAsync(async (req, res) => {

  const searchQuery = pick(req.query, [
    "searchTerm",
    "category",
    "title",
    "location",
   
  ]);
  const paginateQuery = pick(req.query, ["page", "limit"]);
  const result = await postServices.getAllPost(
    searchQuery,
    paginateQuery,
    
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Posts retrived successfully",
    data: result?.data,
    meta: result?.meta,
  });
});

// ---------single post------------------
const getSinglePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await postServices.getSinglePost(postId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Post retrived successfully",
    data: result,
  });
});

// -------------update post by user----------------

// -----------get all post admin--------------
const getAllPostByAdmin = catchAsync(async (req, res) => {
  const paginateQuery = pick(req.query, ["page", "limit"]);
  const result = await postServices.getAllPostByAdmin(paginateQuery);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Posts retrived successfully",
    data: result?.data,
    meta: result?.meta,
  });
});
const updatePost = catchAsync(async (req, res) => {
  const { postId } = req.params;

  console.log({ req: req.body, postId });
  const result = await postServices.updatePost(postId, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Post updated successfully",
    data: result,
  });
});

export const postControllers = {
  createPost,
  createMany,
  getAllPost,
  getSinglePost,
  updatePost,
  getAllPostByAdmin,
 
};
