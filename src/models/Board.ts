import mongoose, { Document, Schema, Model } from 'mongoose';
interface BoardDocument extends Document {
  _id: mongoose.Types.ObjectId;
  boardName: string;
  createdAt: Date;
  updatedAt: Date;
}

type BoardInput = {
  boardName: BoardDocument['boardName'];
}

const BoardSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },

  boardName: {
    type: String,
    required: [true, 'Provide a name'],
    index: true
  },
}, {
  collection: 'Board',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

BoardSchema.virtual('columns', {
  ref: 'Column',
  localField: '_id',
  foreignField: 'boardID',
  justOne: false,
});

const Board: Model<BoardDocument> = mongoose.model<BoardDocument>('Board', BoardSchema);

export { Board, BoardDocument, BoardInput }
