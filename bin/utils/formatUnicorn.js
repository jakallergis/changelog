"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is a beautiful string manipulation function
 * inspired by the stackoverflow formatUnicorn.
 * It enables string subbing using curly braces as the delimiter.
 * @param {string} data The translation key.
 * @param {Object} values The values to substitute in the string
 * @returns {string}
 *
 * @example: formatUnicorn("Hi {name}!", { name: "George" }) // 'Hi George!'
 */
function formatUnicorn(data, values) {
    try {
        if (!values || typeof data !== 'string') {
            return data;
        }
        let string = data;
        for (const value in values) {
            const valueRegExp = new RegExp(`{${value}}`, 'gi');
            string = string.replace(valueRegExp, values[value]);
        }
        return string;
    }
    catch (e) {
        return data;
    }
}
exports.default = formatUnicorn;
