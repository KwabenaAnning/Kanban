import { createColumn, fetchColumnWithCount, deleteColumn } from "../services/column.service";
import { Request, Response, NextFunction } from 'express'

export const creatColumn = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const { col_name, boardID} = req.body

        const data = await createColumn (col_name, boardID)
        res.status(data.code).json(data)
    }catch (error){
    console.log(error)
    next(error)
    }
}

export const fetchColumn = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const data = await fetchColumnWithCount(); 
        res.status(data.code).json(data);
    } catch (error) {
        console.log(error);
        next(error);
    }
  };

  export const deletColumn = async ( req: Request, res: Response, next:NextFunction ) => {
    try{
       const { id } = req.params
       const data = await deleteColumn ( id )
       res.status(data.code).json(data)
    }catch(error){
     console.log(error);
     next(error);
    }
 }