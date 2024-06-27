import { Task, TaskDocument } from "../models/Task";
import mongoose, { Schema } from "mongoose";
import { Subtask } from "../models/Subtasks";

export const creatTask = async (
    BoardID: string,
    columnID: string,
    title: string,
    description: string,
) => {
    try{
        const existingTask = await Task.findOne({title})
        if (existingTask)
            throw new Error('Task already exist')

        const newTask: TaskDocument = await Task.create({
            BoardID,
            columnID,
            title,
            description,
        });
        return{
            code: 200,
            message: 'Task created successfully',
            data: newTask
        };
        } catch( error ){
            console.log(error)
            return{
                code:401,
                message: (error as Error).message || 'Failed to create task',
                data: null
            };
        }
};


export const editTask = async ( id: string, title:string ) => {
    try{
        if (!mongoose.Types.ObjectId.isValid(id))
            throw new Error ('Invalid Task ID')

        const existingTask : TaskDocument | null = await Task.findById (id)
        if(!existingTask){
            throw new Error ('Task does not exist')
        }
        if (existingTask.title === title){
            throw new Error ('Task has already been updated')
        }
        const reult : TaskDocument | null = await Task.findByIdAndUpdate(
            id, 
            {title},
            {new: true, runValidators: true}
        )
        if (!reult){
            throw new Error('Task with this name does not exist')
        }
        return {
            code: 200,
            message: 'Board edited successfully',
            data: reult,
        };
    }catch (error){
        return {
            code: 401,
            message: (error as Error).message || 'Failed to edit Board',
            data: null,
        };
    }
};

export const fetchtasksWithCount = async () => {
    try {
        const task = await Task.find({});
        return {
            code: 200,
            message: 'tasks fetched successfully',
            data: { task },
        };
    } catch (error) {
        console.log(error);
        return {
            code: 401,
            message: (error as Error).message || 'Failed to fetch Boards',
            data: null,
        };
    }
};

export const deleteTask = async (id:string) => {
    try{
    const result = await Task.findById(id)
    if(!result)
        throw new Error('Task with this ID does not exist')
      
    const results = await Subtask.deleteMany({ taskID: id});

    await result.deleteOne();
        return{
            code: 200,
            message: 'Task deleted successfully',
            data: {result, results}
        };
      }catch(error){
        console.log(error)
        return {
            code: 401,
            message: (error as Error).message || 'Failed to delete Task',
            data: null,
          };
      }
};
    