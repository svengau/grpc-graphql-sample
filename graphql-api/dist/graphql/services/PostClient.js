"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = __importStar(require("grpc"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
const packageDefinition = protoLoader.loadSync(__dirname + '/post.proto');
const proto = grpc.loadPackageDefinition(packageDefinition).sample;
const interceptorAuth = (options, nextCall) => new grpc.InterceptingCall(nextCall(options), {
    start: function (metadata, listener, next) {
        metadata.add('x-api-key', 'myapikey');
        next(metadata, listener);
    }
});
exports.default = () => new proto.PostService('localhost:50051', grpc.credentials.createInsecure(), { interceptors: [interceptorAuth] });
