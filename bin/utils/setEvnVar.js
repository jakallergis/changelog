"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const child_process_1 = __importDefault(require("child_process"));
const formatUnicorn_1 = __importDefault(require("./formatUnicorn"));
const CMD = `body=$(cat ./temp)
body="\${body//'%'/'%25'}"
body="\${body//$'\n'/'%0A'}"
body="\${body//$'\r'/'%0D'}"
echo "::set-env name={key}::$body"
`;
function setEvnVar(key, value) {
    try {
        fs_1.default.writeFileSync('./temp', value);
        const command = formatUnicorn_1.default(CMD, { key });
        child_process_1.default.execSync(command).toString('utf-8');
        return true;
    }
    catch (error) {
        console.log({ error });
        process.stderr.write(error.message);
        return false;
    }
}
exports.default = setEvnVar;
