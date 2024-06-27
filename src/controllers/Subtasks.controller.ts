import { creatSubtask, fetchSubtasksWithCount, updateSubtask } from "../services/Subtask.service";
import { Request, Response, NextFunction } from "express";

export const createSubtask = async (req:Request, res:Response, next:NextFunction ) =>{
   try{
     const { subtask,taskID } = req.body

     const data = await creatSubtask ( subtask, taskID )
     res.status(data.code).json(data)
   }catch (error){
    console.log(error)
    next(error)
   }
}

export const fetchSubTasks = async ( req: Request, res: Response, next: NextFunction ) =>{
    try{
        const data = await fetchSubtasksWithCount(); 
        res.status(data.code).json(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
}


export const toggleSubTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { completed } = req.body;
      const { id } = req.params; // Fix syntax error
  
      if (completed === undefined) { // Check if 'completed' is explicitly provided
        return res.status(400).json({
          code: 400,
          message: 'Field completed is required',
          data: null,
        });
      }
  
      const data = await updateSubtask(id, completed);
      res.status(data.code).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };