"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NODE_ENV = process.env.NODE_ENV;
function invariant(condition, message, ...args) {
    if (NODE_ENV !== 'production') {
        if (message === undefined) {
            throw new Error('invariant requires an error message argument');
        }
    }
    if (!condition) {
        let error;
        if (message === undefined) {
            error = new Error('Minified exception occurred; use the non-minified dev environment ' +
                'for the full error message and additional helpful warnings');
        }
        else {
            let argIndex = 0;
            error = new Error(message.replace(/%s/g, () => args[argIndex++]));
            error.name = 'Internal App issue';
        }
        throw error;
    }
}
exports.default = invariant;
