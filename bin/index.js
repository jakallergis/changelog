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
const fs_1 = __importDefault(require("fs"));
const github = __importStar(require("@actions/github"));
const VersionTypes_1 = require("./models/VersionTypes");
const invariant_1 = __importDefault(require("./utils/invariant"));
const getNextVersion_1 = __importDefault(require("./utils/getNextVersion"));
const getPackageJSON_1 = __importDefault(require("./utils/getPackageJSON"));
const generateChangelog_1 = __importDefault(require("./utils/generateChangelog"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const type = process.argv.slice(2)[0];
            const isValidType = VersionTypes_1.VersionTypes.includes(type);
            invariant_1.default(isValidType, `Version type [${type}] is not compatible. Please use one of ${VersionTypes_1.VersionTypes}`);
            const packageJSON = getPackageJSON_1.default();
            const serverUrl = github.context.serverUrl;
            if (!process.env['GITHUB_REPOSITORY']) {
                process.env['GITHUB_REPOSITORY'] = packageJSON.repository;
            }
            const { repo, owner } = github.context.repo || {};
            const commitUrl = `${serverUrl}/${owner}/${repo}/commit`;
            const tagVersion = `v${packageJSON.version}`;
            const version = getNextVersion_1.default(tagVersion, type);
            const tags = `${tagVersion}..HEAD`;
            const ctx = { commitUrl, version, tags };
            const newChangelog = yield generateChangelog_1.default(ctx);
            if (newChangelog) {
                const currentLog = fs_1.default.readFileSync('./CHANGELOG.md', 'utf-8');
                fs_1.default.writeFileSync('./CHANGELOG.md', `${newChangelog}\n\n${currentLog}`);
            }
        }
        catch (error) {
            console.log({ error });
            process.stderr.write(error.message);
        }
    });
}
void main();
