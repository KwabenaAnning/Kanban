import mongoose, { Document, Schema, Model } from 'mongoose';

interface ColumnDocument extends Document {
  _id: mongoose.Types.ObjectId;
  col_name: string;
  boardID: mongoose.Types.ObjectId;
}

type ColumnInput = {
  col_name: ColumnDocument['col_name'];
  boardID: ColumnDocument['boardID'];
}

const ColumnSchema = new Schema({
  boardID: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  col_name: {
    type: String,
    required: [true, 'Provide a name'],
    index: true
  },
}, {
  collection: 'Column',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

ColumnSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'columnID',
  justOne: false,
});

const Column: Model<ColumnDocument> = mongoose.model<ColumnDocument>('Column', ColumnSchema);

export { Column, ColumnDocument, ColumnInput };
