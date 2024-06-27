import mongoose, { Document, Schema, Model } from 'mongoose';

interface SubTasksDocument extends Document {
  _id: mongoose.Types.ObjectId;
  subtask: string;
  completed: boolean;
  taskID: mongoose.Types.ObjectId;
}

type SubTasksInput = {
  subtask: SubTasksDocument['subtask'];
  completed: SubTasksDocument['completed'];
  taskID: SubTasksDocument['taskID'];
}

const SubtaskSchema = new Schema({
  subtask: {
    type: String,
    required: [true, 'Provide your subtask'],
  },
  completed: {
    type: Boolean,
    default: false,
    index: true
  },
  taskID: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
}, {
  collection: 'Subtask',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

const Subtask: Model<SubTasksDocument> = mongoose.model<SubTasksDocument>('Subtask', SubtaskSchema);

export { Subtask, SubTasksDocument, SubTasksInput };
