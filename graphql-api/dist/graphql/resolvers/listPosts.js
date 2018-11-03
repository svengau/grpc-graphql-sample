"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostClient_1 = __importDefault(require("../services/Post/PostClient"));
const client = PostClient_1.default();
exports.default = (root, params) => {
    return new Promise((resolve, reject) => {
        client.listPosts(params, function (err, response) {
            if (err) {
                return reject(err);
            }
            resolve(response);
        });
    });
};
