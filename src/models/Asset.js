import mongoose from 'mongoose';

const { Schema } = mongoose;

const AssetSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
    required: true,
  },
  company_id: {
    type: String,
    required: true,
  },
  unit_id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['AVAILABLE', 'MAINTENANCE', 'DISABLED'],
    default: 'AVAILABLE',
  },
  healthscore: {
    type: Number,
    min: 0,
    max: 100,
    default: 80,
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

export default mongoose.model('Asset', AssetSchema);
