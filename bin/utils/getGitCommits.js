"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const CommitTypes_1 = require("../models/CommitTypes");
const DEL = '----DELIMITER----';
const END = '----END_COMMIT----';
const CMD = `git log --format='%s${DEL}%b${DEL}%H${DEL}%h${END}' --no-merges`;
function getGitCommits(tagsRange) {
    const COMMITS_CMD = `${CMD} ${tagsRange}`;
    const output = child_process_1.default.execSync(COMMITS_CMD).toString('utf-8');
    return output
        .split(`${END}\n`)
        .map(commit => {
        var _a;
        const sections = commit.split(DEL) || [];
        const messageSection = sections[0];
        const bodySection = sections[1];
        const sha = sections[2];
        const shaShort = sections[3];
        const mSplit = messageSection === null || messageSection === void 0 ? void 0 : messageSection.split(': ');
        const typeSection = mSplit.length > 1 ? mSplit[0] : CommitTypes_1.CommitTypes.CHORE;
        const scope = (_a = typeSection.match(/\((.+)\)$/)) === null || _a === void 0 ? void 0 : _a[1];
        const type = scope ? typeSection.replace(/\(.+\)$/, '') : typeSection;
        const message = (mSplit.length > 1 ? mSplit[1] : mSplit[0]) || '-';
        const body = (bodySection === null || bodySection === void 0 ? void 0 : bodySection.split('\n').filter(Boolean).map(b => b.replace(/^- /, ''))) || [];
        return {
            message,
            body,
            sha,
            shaShort,
            type: type,
            scope: scope
        };
    })
        .filter(c => Boolean(c.sha));
}
exports.default = getGitCommits;
