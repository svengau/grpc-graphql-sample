# gRPC / graphQL sample project

this PoC will allow us to create blog posts, and is composed with:

- a **graphQL server**, in front of the client as our unique BFF entry point. Its role is mainly to validate input data (required / optional fields, type, …) and filter output data. The validation here is important since required & optional fields have been dropped from proto3. It also acts as a client to the gRPC micro-service.
- a **gRPC server**, to perform all functional operations. Here to create and list some blog posts.

To run the PoC, install NodeJs, Mongodb and Git, and launch the following commands:

```
git clone git@github.com:svengau/grpc-graphql-sample.git
cd post-api && npm start
cd graphql-api && npm start
🚀 Server ready at http://localhost:4000/graphql
```

and run the following query:

````
mutation {
 addPost(data: { title: "helloooo" }) {
   message
   result { _id title body }
 }
}
```
````
