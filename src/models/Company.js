import mongoose from 'mongoose';

const { Schema } = mongoose;

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  collaborators: {
    type: Array,
    required: true,
    default: [],
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

export default mongoose.model('Company', CompanySchema);
