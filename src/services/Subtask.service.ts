import mongoose, { Schema } from 'mongoose' ;
import { Subtask, SubTasksDocument } from '../models/Subtasks';

export const creatSubtask = async ( 
    subtask: string,
    taskID: Schema.Types.ObjectId
) => {
  try {
    const existingSubtask = await Subtask.findOne ({subtask})
    if (existingSubtask)
        throw new Error ('Subtask already exist')

    const newSubtask: SubTasksDocument = await Subtask.create ({
        subtask,
        completed: false,
        taskID
    });
    return {
        code: 200,
        message: 'Subtask created successfully',
        data: newSubtask
    };
  } catch (error){
    console.log(error)
            return{
                code:401,
                message: (error as Error).message || 'Failed to create Subtask',
                data: null
           };
    }
};

export const fetchSubtasksWithCount = async () => {
    try {
        const subtasks = await Subtask.find({});
        const totalCount = subtasks.length;
        const completedCount = subtasks.filter(subtask => subtask.completed).length;

        return {
            code: 200,
            message: 'Subtasks fetched successfully',
            data: {
                subtasks: {
                    totalCount,
                    completedCount,
                    list: subtasks
                }
            }
        };
    } catch (error) {
        console.log(error);
        return {
            code: 401,
            message: (error as Error).message || 'Failed to fetch subtasks',
            data: null,
        };
    }
};

export const updateSubtask = async (id: string, completed: boolean ) =>{
   try {

    if(!mongoose.Types.ObjectId.isValid(id))
        throw new Error ('Invalid Subtask ID')

    const existingSubtask : SubTasksDocument | null = await Subtask.findById(id)

    if (!existingSubtask){
        throw new Error ('Subtask does not exist')
    }

    existingSubtask.completed =completed

    const updateSubtask = await existingSubtask.save();
    // const updateSubtask: SubTasksDocument | null = await Subtask.findByIdAndUpdate(id, {completed: false}, {taskID})
    //  if (!updateSubtask){
    //     throw new Error('Update is not possible, Check again')
    //  }
     return {
        code: 200,
        message: 'Board edited successfully',
        data: updateSubtask
   }}catch (error){
    console.log(error);
    return{
        code: 401,
        message: (error as Error).message || 'Failed to update Subtask',
        data: null
    };
   }
};