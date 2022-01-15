"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const stream_1 = require("stream");
// @ts-ignore
Buffer.prototype.convertToStream = function () {
    const readable = new stream_1.Readable();
    readable._read = () => { };
    readable.push(this);
    readable.push(null);
    return readable;
};
exports.default = {};
