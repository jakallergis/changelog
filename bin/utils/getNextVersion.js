"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const semver_1 = __importDefault(require("semver"));
const invariant_1 = __importDefault(require("./invariant"));
function getNextVersion(version, type) {
    invariant_1.default(semver_1.default.valid(version), `Can't determine next version because the current version passed is not valid [${version}]`);
    return semver_1.default.inc(version, type) || version;
}
exports.default = getNextVersion;
