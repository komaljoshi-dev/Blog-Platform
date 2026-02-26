import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId, //user create posts so in each post's respective user id are mentioned
    ref: 'User',
    required: true
  }

}, { timestamps: true });


const Post = mongoose.model('Post', postSchema);
export default Post;

