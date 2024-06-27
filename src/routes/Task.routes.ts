import express, { Router } from "express";
import { createTask, fetchTask,editTAsks, deleteTasks } from "../controllers/Task.controller";
const router = express.Router();

router.post('/create', createTask );
router.get('/fetch', fetchTask );
router.delete('/delete/:id', deleteTasks);
router.put('/update', editTAsks);

export default router;