import { Project, UserRole } from '../../../generated/prisma/index';
import prisma from '../../utils/prismaProvider';

const createProject=async(payload:Project)=>{
    const result = await prisma.project.create({
  data: {
    title: payload.title,
    description: payload.description,
    languages: payload.languages,
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
// ------------get all category---------------
const getAllproject = async (paginateQuery: Record<string, unknown>) => {
  const { page = 1, limit = 10 } = paginateQuery;
  const skip = (Number(page) - 1) * Number(limit);
  console.log({ page, limit, skip });
  const result = await prisma.project.findMany({
    take: Number(limit),
    skip,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
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
  // ----------update --------------
  const Updateproject=async(projectId:string,payload:Partial<Project>)=>{

    const result=await prisma.project.update({
      where: { id: projectId },
        data: payload
    });
    return result;
   
   };
  
  // --------delete bike-----------
  const DeleteProject=async(projectId:string)=>{
    const result=await prisma.project.delete({
      where:{id: projectId}
    });
    return result;
  
  };
export const projectService={
    createProject,
    getAllproject,
    Updateproject,
    DeleteProject

}