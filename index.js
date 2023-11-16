"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.textpro = void 0;
const lib_1 = __importDefault(require("./lib"));
const image_mappings_1 = require("./lib/image-mappings");
class TextPro {
    async create(url, text) {
        return await lib_1.default.textPro(url, text);
    }
    async oneTextCreate(url, text) {
        return await this.create(url, [text]);
    }
    async twoTextCreate(url, text) {
        return await this.create(url, text);
    }
    async generate(name, text) {
        const url = image_mappings_1.imageMappings[name];
        if (!url) {
            throw new Error(`Doe not exists a image with name: ${name}`);
        }
        if (name == 'pornhub' || name == 'bigsale') {
            if (typeof text == 'string') {
                throw new Error(`This image receive a string array: ${name}`);
            }
        }
        if (typeof text == 'string') {
            text = [text];
        }
        return await this.create(url, text);
    }
}
const textpro = new TextPro();
exports.textpro = textpro;
//# sourceMappingURL=index.js.map