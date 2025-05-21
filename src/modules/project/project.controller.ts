import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { projectService } from "./project.service";
import status from "http-status";
import pick from "../../utils/pick";
import { postServices } from "../post/post.service";

const createProject = catchAsync(async (req:Request, res:Response, next) => {

    const result=await projectService.createProject(req.body)
    sendResponse(res,{
        statusCode:status.CREATED,
        success:true,
        message:"project created sucessfully",
        data:result
    })
});
// ------------------get all project--------------
const getAllProject = catchAsync(async (req, res) => {
  const searchQuery = pick(req.query, [
    "searchTerm",
    "category",
    "title",
    "location",
    "priceRange",
  ]);

  const result = await projectService.getAllproject(
    searchQuery,
    
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Posts retrived successfully",
    data: result?.data,
    meta: result?.meta,
  });
});


// ------------update customer--------

const UpdateProject=async(req:Request,res:Response)=>{
    const {projectId}=req.params;
    const updateproject=await projectService.Updateproject(projectId,req.body);
    
    if(!updateproject){
        return sendResponse(res,{
            success: false,
            statusCode: status.NOT_FOUND,
            message: 'project not found',
            data: null,
        });
        
            }
        
            sendResponse(res, {
                success: true,
                statusCode: status.OK,
                message: 'update project  successfully',
                data: updateproject
              });

    
};

// ----------delete customer----------
const DeleteProject=async(req:Request,res:Response)=>{
    const{projectId}=req.params;
    const result=await projectService.DeleteProject(projectId);
    if(!result){
        return sendResponse(res,{
            success: false,
            statusCode: status.NOT_FOUND,
            message: 'project not found',
            data: null,
        });
        
            }
        
            sendResponse(res, {
                success: true,
                statusCode: status.OK,
                message: 'project delete successfully',
                data: result
              });
};
const getSingleProject = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const result = await projectService.getSingleProject(projectId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Project retrived successfully",
    data: result,
  });
});

export const projectController={
    createProject,
    getAllProject,
    UpdateProject,
    DeleteProject,
    getSingleProject
}