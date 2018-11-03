"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addPost_1 = __importDefault(require("./addPost"));
const listPosts_1 = __importDefault(require("./listPosts"));
const resolvers = {
    Mutation: {
        addPost: addPost_1.default
    },
    Query: {
        listPosts: listPosts_1.default
    },
};
exports.default = resolvers;
