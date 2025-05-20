
import express from 'express';
import { projectController } from './project.controller';
import { projectService } from './project.service';

const router=express.Router();

router.post('/',projectController.createProject);
router.get('/',projectController.getAllProject);
router.put('/:projectId',projectController.UpdateProject);
router.delete('/:projectId',projectController.DeleteProject);
export const Projectrouter=router;