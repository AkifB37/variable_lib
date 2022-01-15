"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const variable_1 = __importDefault(require("./variable"));
const statement_1 = __importDefault(require("./statement"));
(new variable_1.default());
let string = `test`;
string.replaceAll(`t`, `e`);
let number = 10;
number.isInt();
let c = statement_1.default.Switch(number, [
    [1, () => false],
    [2, () => false],
    [10, () => true],
]);
statement_1.default.Foreach([0, 2, 3], (key, value) => {
    console.log(value);
});
