"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const invariant_1 = __importDefault(require("./invariant"));
const preload_1 = __importDefault(require("semver/preload"));
const CURRENT_TAG_CMD = 'git describe --tags --abbrev=0';
function getTagVersion() {
    const version = child_process_1.default
        .execSync(CURRENT_TAG_CMD)
        .toString('utf-8')
        .replace('\n', '');
    invariant_1.default(preload_1.default.valid(version), `Tag version ${version} is not a valid semver version`);
    return version || 'v0.0.0';
}
exports.default = getTagVersion;
