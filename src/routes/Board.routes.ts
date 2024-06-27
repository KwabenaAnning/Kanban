import express from "express";
import { creatBoard, fetchBoard, deletBoard, editBoards } from "../controllers/Board.controller";

const router = express.Router();

router.post('/create', creatBoard);
router.get('/fetch', fetchBoard )
router.delete('/delete/:id', deletBoard);
router.put('/update', editBoards);

export default router;