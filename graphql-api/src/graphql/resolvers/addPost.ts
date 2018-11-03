
import PostClient from '../services/Post/PostClient';

const  client = PostClient();

export default (root:any, params: any) => {
  return new Promise((resolve: any, reject: any) => {
    client.addPost(params.data, function(err: any, response: any) {
      if (err) {
        return reject(err.details);
      }
      resolve({message: "post.created", result: response});
    });
  });
};
