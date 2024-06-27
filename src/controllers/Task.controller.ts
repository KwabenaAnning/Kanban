import { creatTask, deleteTask, editTask, fetchtasksWithCount } from "../services/tasks.service";
import { Request, Response, NextFunction } from "express";

export const createTask = async (req:Request, res:Response, next:NextFunction ) =>{
   try{
     const { BoardID, columnID ,title, description} = req.body

     const data = await creatTask ( BoardID, columnID ,title, description )
     res.status(data.code).json(data)
   }catch (error){
    console.log(error)
    next(error)
   }
}

export const fetchTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await fetchtasksWithCount(); 
        res.status(data.code).json(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
  };


export const editTAsks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, title } = req.body
      if (!id || !title) {
        return res.status(400).json({
            code: 400,
            message: 'Title name is required',
            data: null,
        });
    }
      const data = await editTask (id, title)
      res.status(data.code).json(data)
    }catch(error){
      console.log(error);
      next(error);
    }
  };

export const deleteTasks = async (req:Request, res: Response, next:NextFunction) => {
    try {
        const { id } =req.params;
        const data = await deleteTask ( id )
        res.status(data.code).json(data)
    }catch ( error ) {
        console.log( error );
        next ( error );
    }
};