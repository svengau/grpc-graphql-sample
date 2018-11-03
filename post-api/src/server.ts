import App from './App';

const app = new App('mongodb://localhost:27017/sample-grpc', 50051);
app.start();
