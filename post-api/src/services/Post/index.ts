import addPost from './addPost';
import listPosts from './listPosts';

const protoPath = `${__dirname}/Post.proto`;

export default {
  protoPath,
  implementation: {
    PostService: {
      addPost,
      listPosts
    }
  }
};
