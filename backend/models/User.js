import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resumeUrl: { type: String, default: "" }, // S3 Resume Link
    skills: { type: [String], default: [] },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
