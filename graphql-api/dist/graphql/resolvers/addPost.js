"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostClient_1 = __importDefault(require("../services/Post/PostClient"));
const client = PostClient_1.default();
exports.default = (root, params) => {
    return new Promise((resolve, reject) => {
        client.addPost(params.data, function (err, response) {
            if (err) {
                return reject(err.details);
            }
            resolve({ message: "post.created", result: response });
        });
    });
};
