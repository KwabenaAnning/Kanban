import mongoose, { Document, Schema, Model } from 'mongoose';

interface TaskDocument extends Document {
  _id: mongoose.Types.ObjectId;
  boardID: mongoose.Types.ObjectId;
  columnID: mongoose.Types.ObjectId;
  title: string;
  description: string;
}

type TaskInput = {
  title: TaskDocument['title'];
  description: TaskDocument['description'];
}

const TaskSchema = new Schema({
  boardID: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  columnID: {
    type: Schema.Types.ObjectId,
    ref: 'Column',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Provide a name'],
    index: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Provide a description'],
  },
}, {
  collection: 'Task',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

TaskSchema.virtual('subtasks', {
  ref: 'Subtask',
  localField: '_id',
  foreignField: 'taskID',
  justOne: false,
});

const Task: Model<TaskDocument> = mongoose.model<TaskDocument>('Task', TaskSchema);

export { Task, TaskDocument, TaskInput };
