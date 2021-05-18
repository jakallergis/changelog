"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const semver_1 = __importDefault(require("semver"));
const formatUnicorn_1 = __importDefault(require("./formatUnicorn"));
const child_process_1 = __importDefault(require("child_process"));
const CMD = 'git tag --points-at HEAD';
function getHasVersionTagOnHEAD() {
    const command = formatUnicorn_1.default(CMD);
    const tag = child_process_1.default.execSync(command).toString('utf-8');
    return !!semver_1.default.valid(tag);
}
exports.default = getHasVersionTagOnHEAD;
