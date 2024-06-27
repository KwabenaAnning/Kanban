import { Column, ColumnDocument } from "../models/Column";
import { Subtask } from "../models/Subtasks";
import { Task } from "../models/Task";


export const createColumn  = async (
    col_name: string,
    boardID: string,
) => {
    try{
    const existingColumn = await Column.findOne({col_name})
    if (existingColumn)
        throw new Error('Column already exist')

    const newColumn: ColumnDocument = await Column.create({
        col_name,
        boardID,
    });
     return {
        code: 200,
        message: 'New Column created',
        data: newColumn,
     };
    } catch ( error ) {
        console.log(error)
        return{
            code:401,
            message: (error as Error).message || 'Failed to create column',
            data: null
        };
    } 
};


export const fetchColumnWithCount = async () => {
    try {
        const columns = await Column.find({});
        const count = await Column.countDocuments({});
        return {
            code: 200,
            message: 'Columns fetched successfully',
            data: { columns, count },
        };
    } catch (error) {
        console.log(error);
        return {
            code: 401,
            message: (error as Error).message || 'Failed to fetch Columns',
            data: null,
        };
    }
};


export const deleteColumn = async (id:string) => {
    try{
    const result = await Column.findById(id)
    if(!result)
        throw new Error('Column with this ID does not exist')
    
  // Find tasks associated with the column
  const tasks = await Task.find({ columnID: id });
  const taskIDs = tasks.map(task => task._id);

  // Delete subtasks associated with the tasks
  await Subtask.deleteMany({ taskID: { $in: taskIDs } });
  const taskDeletionResult = await Task.deleteMany({ columnID: id });

    await result.deleteOne();
        return{
            code: 200,
            message: 'Column deleted successfully',
            data: {result, taskDeletionResult}
        };
      }catch(error){
        return {
            code: 401,
            message: (error as Error).message || 'Failed to delete Column',
            data: null,
          };
      }
};

    