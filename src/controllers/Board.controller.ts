import { createBoard, fetchBoardsWithCount, deleteBoard, editBoard } from "../services/board.service";
import { Request, Response, NextFunction } from "express";

export const creatBoard = async ( req:Request, res:Response, next:NextFunction )=>{
  try{
    const { boardName} = req.body

    const data = await createBoard ( boardName )
    res.status(data.code).json(data)
  } catch (error){
    console.log(error)
    next(error)
  }
}

export const fetchBoard = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const data = await fetchBoardsWithCount(); 
      res.status(data.code).json(data);
  } catch (error) {
      console.log(error);
      next(error);
  }
};

export const editBoards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, boardName } = req.body
    if (!id || !boardName) {
      return res.status(400).json({
          code: 400,
          message: 'Board name is required',
          data: null,
      });
  }
    const data = await editBoard (id, boardName)
    res.status(data.code).json(data)
  }catch(error){
    console.log(error);
    next(error);
  }
};

export const deletBoard = async ( req: Request, res: Response, next:NextFunction ) => {
   try{
      const { id } = req.params
      const data = await deleteBoard ( id )
      res.status(data.code).json(data)
   }catch(error){
    console.log(error);
    next(error);
   }
}