import express, { Router } from "express";
import { createSubtask, fetchSubTasks, toggleSubTasks } from "../controllers/Subtasks.controller";
const router = express.Router();

router.post('/create', createSubtask);
router.get('/fetch', fetchSubTasks);
router.patch('/subtasks/:id/toggle', toggleSubTasks )
export default router;