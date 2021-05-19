"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCurrentChangelog = void 0;
const CommitTypes_1 = require("../models/CommitTypes");
const CommitScopes_1 = require("../models/CommitScopes");
const formatUnicorn_1 = __importDefault(require("./formatUnicorn"));
class Formatter {
    constructor() {
        this.headerTemplate = '# {text}\n\n';
        this.subHeaderTemplate = '### {text}\n';
        this.scopeTemplate = '**[${scope}]**';
        this.linkTemplate = '[{text}]({url})';
    }
    formatCommit(commit) {
        const { message, type } = commit;
        const link = this.getCommitLink(commit);
        const scope = this.getCommitScope(commit);
        const formattedBody = this.getCommitBody(commit);
        let formattedText = `- ${scope}${message} (${link})`;
        if ([CommitTypes_1.CommitTypes.FEATURE, CommitTypes_1.CommitTypes.FIX].includes(type)) {
            formattedText = `${formattedText}${formattedBody}`;
        }
        return formattedText;
    }
    formatVersionTitle(version) {
        const date = new Date().toISOString().split('T')[0];
        return this.getHeader(`Version ${version} (${date})`);
    }
    formatSectionList(title, items) {
        if (!(title || items.length))
            return '';
        let string = this.getSubHeader(title);
        string += items.join('\n');
        string += '\n\n';
        return string;
    }
    /** Getters / Setters */
    getHeader(text) {
        if (!text)
            return '';
        return formatUnicorn_1.default(this.headerTemplate, { text });
    }
    getSubHeader(text) {
        if (!text)
            return '';
        return formatUnicorn_1.default(this.subHeaderTemplate, { text });
    }
    getCommitLink(commit) {
        if (!((commit === null || commit === void 0 ? void 0 : commit.sha) && (commit === null || commit === void 0 ? void 0 : commit.shaShort)))
            return '';
        const text = commit.shaShort;
        const url = `{commitUrl}/${commit.sha}`;
        return formatUnicorn_1.default(this.linkTemplate, { text, url });
    }
    getCommitScope(commit) {
        if (!(commit === null || commit === void 0 ? void 0 : commit.scope))
            return '';
        const string = formatUnicorn_1.default(this.scopeTemplate, { scope: commit.scope });
        return `${string} `;
    }
    getCommitBody(commit) {
        var _a;
        if (!((_a = commit === null || commit === void 0 ? void 0 : commit.body) === null || _a === void 0 ? void 0 : _a.length))
            return '';
        return `\n  - ${commit.body.join('\n  - ')}`;
    }
}
class SlackFormatter extends Formatter {
    constructor() {
        super(...arguments);
        this.headerTemplate = '*{text}*\n\n';
        this.subHeaderTemplate = '*{text}*\n';
        this.scopeTemplate = '*[${scope}]*';
        this.linkTemplate = '<{text}|{url}>';
    }
}
const formatters = {
    slack: new SlackFormatter(),
    markdown: new Formatter()
};
function extractCurrentChangelog(commits, version, format = 'markdown') {
    const formatter = formatters[format] || formatters.markdown;
    let newChangelog = formatter.formatVersionTitle(version);
    if (commits === null || commits === void 0 ? void 0 : commits.length) {
        const features = [];
        const fixes = [];
        const chores = [];
        const deps = [];
        for (const commit of commits) {
            const formattedText = formatter.formatCommit(commit);
            if (commit.type === CommitTypes_1.CommitTypes.CHORE) {
                const isDep = commit.scope === CommitScopes_1.CommitScopes.DEPS;
                const isDepDev = commit.scope === CommitScopes_1.CommitScopes.DEPS_DEV;
                if (isDep || isDepDev) {
                    deps.push(formattedText);
                }
                else {
                    chores.push(formattedText);
                }
                continue;
            }
            if (commit.type === CommitTypes_1.CommitTypes.FEATURE)
                features.push(formattedText);
            if (commit.type === CommitTypes_1.CommitTypes.FIX)
                fixes.push(formattedText);
        }
        newChangelog += formatter.formatSectionList('Features', features);
        newChangelog += formatter.formatSectionList('Fixes', fixes);
        newChangelog += formatter.formatSectionList('Chores', chores);
        newChangelog += formatter.formatSectionList('Changed Dependencies', deps);
    }
    return newChangelog;
}
exports.extractCurrentChangelog = extractCurrentChangelog;
