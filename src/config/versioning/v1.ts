import express, {Request, Response} from "express";
import column from '../../routes/column.routes';
import board from '../../routes/Board.routes';
import task from '../../routes/Task.routes';
import  Subtasks from "../../routes/Subtasks.routes";
import { appErrorHandler } from "../../middlewares/error.middleware";
const api = express.Router();

api.get(('/'), (req:Request, res:Response) =>  res.status(200).json({
    status: 'success',
    message: 'Welcome to KANBAN API'
  }))

api.use('/column', column)
api.use('/board', board)
api.use('/task', task)
api.use ('/subtasks', Subtasks)

export default api