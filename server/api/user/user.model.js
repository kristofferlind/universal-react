import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  role: {
    type: String,
    enum: ['Guest', 'User', 'Administrator']
  }
});

export default mongoose.model('User', UserSchema);
