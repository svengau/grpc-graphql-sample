import PostClient from '../services/Post/PostClient';

const  client = PostClient();

interface Params {
  _id: string;
}

export default (root:any, params: Params) => {
  return new Promise((resolve: any, reject: any) => {
    client.listPosts(params, function(err: any, response: any) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};
