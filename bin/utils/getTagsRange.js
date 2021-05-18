"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formatUnicorn_1 = __importDefault(require("./formatUnicorn"));
const child_process_1 = __importDefault(require("child_process"));
const CMD = 'git tag --sort=-version:refname | head -n {count}';
function getTagsRange(count = 2) {
    const command = formatUnicorn_1.default(CMD, { count });
    const tags = child_process_1.default
        .execSync(command)
        .toString('utf-8')
        .split('\n')
        .filter(Boolean);
    const mostRecentTag = tags[0];
    const oldestTag = tags[tags.length - 1];
    if (!mostRecentTag && !oldestTag)
        return '';
    if (mostRecentTag === oldestTag)
        return `${mostRecentTag}..HEAD`;
    if (mostRecentTag && oldestTag)
        return `${oldestTag}..${mostRecentTag}`;
    return '';
}
exports.default = getTagsRange;
