// import mongoose from 'mongoose';
// import { Task, TaskDocument } from '../models/Task';
// import { creatTask, editTask, deleteTask } from '../services/tasks.service';

// beforeAll(async () => {
//   await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test_db');
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });

// describe('Task Controller Tests', () => {
//   it('should create a new task', async () => {
//     const boardId = new mongoose.Types.ObjectId();
//     const columnId = new mongoose.Types.ObjectId(); // Ensure valid ObjectId
//     const response = await creatTask(boardId.toString(), columnId.toString(), 'Test Task', 'Test Description');
//     expect(response.code).toBe(200);
//     expect(response.message).toBe('Task created successfully'); // Assuming this is the actual response
//     if (response.data) {
//       expect(response.data).toHaveProperty('task');
//     }
//   }, 10000);

//   it('should edit an existing task', async () => {
//     const boardId = new mongoose.Types.ObjectId();
//     const columnId = new mongoose.Types.ObjectId();
//     const newTask: TaskDocument = await Task.create({
//       boardID: boardId,
//       columnID: columnId,
//       title: 'Origine Task',
//       description: 'Original Description',
//     });
//     const updatedTitle = 'Updated Task';
//     const response = await editTask(newTask._id.toString(), updatedTitle);
//     expect(response.code).toBe(200);
//     expect(response.message).toBe('Board edited successfully'); // Assuming this is the actual response
//     expect(response.data).toHaveProperty('title', updatedTitle);
//   }, 10000);

//   it('should delete a task and its related subtasks', async () => {
//     const boardId = new mongoose.Types.ObjectId();
//     const columnId = new mongoose.Types.ObjectId();
//     const newTask: TaskDocument = await Task.create({
//       boardID: boardId,
//       columnID: columnId,
//       title: 'Delete Test Task',
//       description: 'Test Description',
//     });
//     const response = await deleteTask(newTask._id.toString());
//     expect(response.code).toBe(200);
//     expect(response.message).toBe('Task deleted successfully'); // Assuming this is the actual response

//     // Assuming your `deleteTask` service handles subtasks appropriately
//     // Update this expectation based on your specific implementation
//     // expect(response.results.deletedCount).toBeGreaterThanOrEqual(1);
//   }, 10000);
// });