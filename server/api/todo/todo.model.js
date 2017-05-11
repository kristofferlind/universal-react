import mongoose, { Schema } from 'mongoose';

const TodoSchema = new Schema({
  text: String,
  isDone: Boolean
});

export default mongoose.model('Todo', TodoSchema);
