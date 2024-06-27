// import mongoose, { Document, Schema, Model, Types } from 'mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';
// import { Subtask, SubTasksDocument } from '../models/Subtasks';
// import { creatSubtask, fetchSubtasksWithCount, updateSubtask } from '../services/Subtask.service';

// new Types.ObjectId()

// let mongoServer: MongoMemoryServer;

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();
//   await mongoose.connect(uri)
// });

// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

// describe('Subtask Controller Tests', () => {
//     // it('should create a new subtask', async () => {
//     //     const response = await creatSubtask('Test Subtask', new mongoose.Types.ObjectId());
//     //     expect(response.code).toBe(200);
//     //   expect(response.message).toBe('Subtask created successfully');
//     //   expect(response.data).toHaveProperty('subtask', 'Test Subtask');
//     // });
  
//     it('should fetch subtasks with count', async () => {
//       const response = await fetchSubtasksWithCount();
//       expect(response.code).toBe(200);
//       expect(response.message).toBe('Subtasks fetched successfully');
//       if (response.data) {
//         expect(response.data.subtasks).toHaveProperty('totalCount');
//         expect(response.data.subtasks).toHaveProperty('completedCount');
//         expect(response.data.subtasks).toHaveProperty('list');
//       }
//     });
  
//     it('should update an existing subtask', async () => {
//       // Create a new subtask
//       const newSubtask = await Subtask.create({
//         subtask: 'Original Subtask',
//         completed: false,
//         taskID: new mongoose.Types.ObjectId(),
//     }) as SubTasksDocument;
  
//       const response = await updateSubtask(newSubtask._id.toString(), true);
//       expect(response.code).toBe(200);
//       expect(response.message).toBe('Board edited successfully');
//       expect(response.data).toHaveProperty('completed', true);
//     });
//   });
