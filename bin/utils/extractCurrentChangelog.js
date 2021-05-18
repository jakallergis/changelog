"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCurrentChangelog = void 0;
const CommitTypes_1 = require("../models/CommitTypes");
const CommitScopes_1 = require("../models/CommitScopes");
function extractCurrentChangelog(commits, version) {
    const date = new Date().toISOString().split('T')[0];
    let newChangelog = `**Version ${version} (${date})**\n\n`;
    if (commits === null || commits === void 0 ? void 0 : commits.length) {
        const features = [];
        const fixes = [];
        const chores = [];
        const deps = [];
        for (const commit of commits) {
            const { sha, shaShort, message, body, type, scope } = commit;
            const link = `[${shaShort}]({commitUrl}/${sha})`;
            const formattedScope = scope ? `**[${scope}]** ` : '';
            let formattedText = `- ${formattedScope}${message} (${link})`;
            if (type === CommitTypes_1.CommitTypes.CHORE) {
                const isDep = scope === CommitScopes_1.CommitScopes.DEPS;
                const isDepDev = scope === CommitScopes_1.CommitScopes.DEPS_DEV;
                if (isDep || isDepDev) {
                    deps.push(formattedText);
                }
                else {
                    chores.push(formattedText);
                }
                continue;
            }
            const formattedBody = (body === null || body === void 0 ? void 0 : body.length) ? `\n  - ${body.join('\n  - ')}` : '';
            formattedText = `${formattedText}${formattedBody}`;
            if (type === CommitTypes_1.CommitTypes.FEATURE)
                features.push(formattedText);
            if (type === CommitTypes_1.CommitTypes.FIX)
                fixes.push(formattedText);
        }
        if (features.length) {
            newChangelog += `**Features**\n`;
            newChangelog += features.join('\n');
            newChangelog += '\n\n';
        }
        if (fixes.length) {
            newChangelog += `**Fixes**\n`;
            newChangelog += fixes.join('\n');
            newChangelog += '\n\n';
        }
        if (chores.length) {
            newChangelog += `**Chores**\n`;
            newChangelog += chores.join('\n');
            newChangelog += '\n\n';
        }
        if (deps.length) {
            newChangelog += `**Changed Dependencies**\n`;
            newChangelog += deps.join('\n');
            newChangelog += '\n\n';
        }
    }
    return newChangelog;
}
exports.extractCurrentChangelog = extractCurrentChangelog;
