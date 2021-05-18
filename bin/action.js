"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const getTagsRange_1 = __importDefault(require("./utils/getTagsRange"));
const getTagVersion_1 = __importDefault(require("./utils/getTagVersion"));
const generateChangelog_1 = __importDefault(require("./utils/generateChangelog"));
const getHasVersionTagOnHEAD_1 = __importDefault(require("./utils/getHasVersionTagOnHEAD"));
/**
 * This is the code that the Github Action will run.
 * Because we won't have access to the main project's
 * code at the time of the creation, we will be getting
 * our version numbers strictly from the git tags.
 * TODO: See if I can access the actual project's
 *       package.json from when this runs as an
 *       action in Github
 */
function action() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hasVersionTagOnHEAD = getHasVersionTagOnHEAD_1.default();
            core.setOutput('hasVersionTagOnHEAD', hasVersionTagOnHEAD);
            const checkForSkip = core.getInput('skipIfNoVersionTagOnHEAD') === 'true';
            if (checkForSkip && !hasVersionTagOnHEAD) {
                core.info('Action is skipped because HEAD does not include a version tag');
                return;
            }
            const serverUrl = github.context.serverUrl;
            if (!process.env['GITHUB_REPOSITORY']) {
                process.env['GITHUB_REPOSITORY'] = 'jakallergis/changelog-generator';
            }
            const { repo, owner } = github.context.repo || {};
            const commitUrl = `${serverUrl}/${owner}/${repo}/commit`;
            const version = getTagVersion_1.default();
            const tags = getTagsRange_1.default(2);
            const ctx = { commitUrl, version, tags };
            const newChangelog = yield generateChangelog_1.default(ctx);
            core.setOutput('changelog', newChangelog);
        }
        catch (error) {
            console.log({ error });
            core.setFailed(error.message);
            process.stderr.write(error.message);
        }
    });
}
void action();
