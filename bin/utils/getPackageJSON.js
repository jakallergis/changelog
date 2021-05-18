"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
let packageJSON = {};
function getPackageJSON() {
    try {
        const mainPath = process.env.INIT_CWD;
        const packageJSONPath = path_1.default.resolve(mainPath, 'package.json');
        packageJSON = require(packageJSONPath);
    }
    catch (e) {
        console.log(`[ERROR]: ${e.message}`);
    }
    return packageJSON;
}
exports.default = getPackageJSON;
