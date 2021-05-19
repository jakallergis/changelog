"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const formatUnicorn_1 = __importDefault(require("./formatUnicorn"));
const CMD = 'echo "{key}={value}" >> $GITHUB_ENV';
function setEvnVar(key, value) {
    try {
        const escapedValue = value.replace('"', '\\"');
        const command = formatUnicorn_1.default(CMD, { key, value: escapedValue });
        child_process_1.default.execSync(command).toString('utf-8');
        return true;
    }
    catch (error) {
        console.log({ error });
        process.stderr.write(error.message);
        return false;
    }
}
exports.default = setEvnVar;
