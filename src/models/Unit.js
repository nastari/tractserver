import mongoose from 'mongoose';

const { Schema } = mongoose;

const UnitSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  countAssets: {
    type: Number,
    required: true,
    default: 0,
  },
  // available: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
  // underMaintenance: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
  // disabled: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
  // stable: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
  // onAlert: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
  // critical: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
  company: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('Unit', UnitSchema);
