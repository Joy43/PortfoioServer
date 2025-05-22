
import express from 'express';
import { projectController } from './project.controller';



const router=express.Router();
router.put('/:projectId',projectController.UpdateProject);
router.post('/',projectController.createProject);
router.get('/',projectController.getAllProject);
router.get("/:id",projectController.getSingleProject)
router.delete('/:projectId',projectController.DeleteProject);
export const Projectrouter=router;