import mongoose from 'mongoose';
import { Board, BoardDocument } from '../models/Board';
import { Column } from '../models/Column';
import { Task } from '../models/Task';
import { Subtask } from '../models/Subtasks';

export const createBoard = async (boardName: string): Promise<any> => {
    try {
        const existingBoard = await Board.findOne({ boardName });
        if (existingBoard) {
            throw new Error('This board already exists');
        }

        const newBoard: BoardDocument = await Board.create({
            boardName,
        });

        return {
            code: 200,
            message: 'New Board created',
            data: newBoard,
        };
    } catch (error) {
        console.log(error);
        return {
            code: 401,
            message: (error as Error).message || 'Failed to create Board',
            data: null,
        };
    }
};

export const fetchBoardsWithCount = async (): Promise<any> => {
    try {
        const boards = await Board.find({}).populate({
            path: 'columns',
            populate: {
                path: 'tasks',
                populate: {
                    path: 'subtasks',
                },
            },
        });
        const count = await Board.countDocuments({});
        return {
            code: 200,
            message: 'Boards fetched successfully',
            data: { boards, count },
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

export const editBoard = async (id: string, boardName: string): Promise<any> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid Board ID');
        }

        const existingBoard: BoardDocument | null = await Board.findById(id);

        if (!existingBoard) {
            throw new Error('Board with this ID does not exist');
        }

        if (existingBoard.boardName === boardName) {
            throw new Error('Board name is already updated');
        }

        const result: BoardDocument | null = await Board.findByIdAndUpdate(
            id,
            { boardName },
            { new: true, runValidators: true }
        );

        if (!result) {
            throw new Error('Board with this name does not exist');
        }

        return {
            code: 200,
            message: 'Board edited successfully',
            data: result,
        };
    } catch (error) {
        return {
            code: 401,
            message: (error as Error).message || 'Failed to edit Board',
            data: null,
        };
    }
};

export const deleteBoard = async (id: string): Promise<any> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid Board ID');
        }

        const board = await Board.findById(id);
        if (!board) {
            throw new Error('Board with this ID does not exist');
        }

        const columns = await Column.find({ boardID: id });
        const columnIDs = columns.map((column) => column._id);

        await Subtask.deleteMany({ taskID: { $in: columnIDs } });
        const taskDeletionResult = await Task.deleteMany({ columnID: { $in: columnIDs } });
        const columnDeletionResult = await Column.deleteMany({ boardID: id });

        await board.deleteOne();

        return {
            code: 200,
            message: 'Board, associated columns, tasks, and subtasks deleted successfully',
            data: {
                board,
                deletedColumnsCount: columnDeletionResult.deletedCount,
                deletedTasksCount: taskDeletionResult.deletedCount,
            },
        };
    } catch (error) {
        return {
            code: 401,
            message: (error as Error).message || 'Failed to delete Board',
            data: null,
        };
    }
};
