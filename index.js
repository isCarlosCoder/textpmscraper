"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.textpro = void 0;
const lib_1 = __importDefault(require("./lib"));
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
}
const textpro = new TextPro();
exports.textpro = textpro;
//# sourceMappingURL=index.js.map