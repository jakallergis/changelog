"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const child_process_1 = __importDefault(require("child_process"));
const path_1 = require("path");
// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
    process_1.env['INPUT_SKIPIFNOVERSIONTAGONHEAD'] = 'false';
    const np = process_1.execPath;
    const ip = path_1.join(__dirname, '..', 'lib', 'src', 'action.js');
    const options = { env: process_1.env };
    const runner = () => {
        const result = child_process_1.default.execFileSync(np, [ip], options).toString('utf-8');
        console.log(result);
    };
    expect(runner).not.toThrow();
});
