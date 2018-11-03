import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  title: {type: String, required: true, minlength: 2, maxlength: 10},
  body: {type: String},
}, {
  strict: 'throw',
  timestamps: true
});

export default mongoose.model('Post', schema);
