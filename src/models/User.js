import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: false,
  },
  avatar_url: {
    type: String,
    required: false,
  },
  company_id: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    defaulValue: false,
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

export default mongoose.model('User', UserSchema);
