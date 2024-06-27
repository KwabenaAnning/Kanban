// import mongoose from 'mongoose';
// import { Column, ColumnDocument } from '../models/Column';
// import { createColumn, deleteColumn } from '../services/column.service';

// beforeAll(async () => {
//   await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test_db');
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });

// beforeEach(async () => {
//   await mongoose.connection.db.dropDatabase();
// });

// describe('Column Controller Tests', () => {
//   it('should create a new column', async () => {
//     const boardId = new mongoose.Types.ObjectId();
//     const uniqueColName = `Test Column ${new Date().getTime()}`; // Ensure unique column name
//     const response = await createColumn(uniqueColName, boardId.toString());
//     expect(response.code).toBe(200);
//     expect(response.message).toBe('New Column created successfully'); // Assuming this is the actual response
//     if (response.data) {
//       expect(response.data).toHaveProperty('col_name', uniqueColName);
//     }
//   }, 10000);

//   it('should delete a column and its related tasks and subtasks', async () => {
//     const boardId = new mongoose.Types.ObjectId();
//     const newColumn: ColumnDocument = await Column.create({
//       col_name: `Delete Test Column ${new Date().getTime()}`, // Ensure unique column name
//       boardID: boardId,
//     });

//     const response = await deleteColumn(newColumn._id.toString());
//     expect(response.code).toBe(200);
//     expect(response.message).toBe('Column deleted successfully');
//     if (response.data) {
//       // Assuming deletion logic works as expected
//       expect(response.data.taskDeletionResult.deletedCount).toBe(0); // Handle potential subtasks
//     }
//   }, 10000);
// });
