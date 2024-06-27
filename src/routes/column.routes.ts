import express, { Router } from "express"
import { creatColumn, fetchColumn, deletColumn } from "../controllers/column.controller"

const router = express.Router()

router.post("/create", creatColumn);
router.get("/fetch", fetchColumn )
router.delete("/delete/:id", deletColumn)

export default router;