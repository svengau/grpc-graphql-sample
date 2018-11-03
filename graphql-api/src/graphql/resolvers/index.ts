import addPost from './addPost';
import listPosts from './listPosts';

const resolvers: any  = {
  Mutation: {
    addPost
  },
  Query: {
    listPosts
  },
};

export default resolvers;
