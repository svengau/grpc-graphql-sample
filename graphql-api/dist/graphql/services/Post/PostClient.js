"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const grpc = __importStar(require("grpc"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
const packageDefinition = protoLoader.loadSync(__dirname + '/post.proto');
const proto = grpc.loadPackageDefinition(packageDefinition).sample;
const credentials = grpc.credentials.createSsl(fs_1.default.readFileSync(__dirname + '/cert/ca.crt'), fs_1.default.readFileSync(__dirname + '/cert/client.key'), fs_1.default.readFileSync(__dirname + '/cert/client.crt'));
const interceptorAuth = (options, nextCall) => new grpc.InterceptingCall(nextCall(options), {
    start: function (metadata, listener, next) {
        metadata.add('x-api-key', 'myapikey');
        next(metadata, listener);
    }
});
const options = {
    'grpc.ssl_target_name_override': 'localhost',
    interceptors: [interceptorAuth]
};
exports.default = () => new proto.PostService('localhost:50051', credentials, options);
