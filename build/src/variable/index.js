"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateMask = exports.ClearTypes = void 0;
require("./number");
require("./string");
require("./array");
require("./buffer");
require("./math");
const date_1 = require("./date");
Object.defineProperty(exports, "DateMask", { enumerable: true, get: function () { return date_1.DateMask; } });
var FilterTypes;
(function (FilterTypes) {
    FilterTypes[FilterTypes["EMAIL"] = 0] = "EMAIL";
    FilterTypes[FilterTypes["INT"] = 1] = "INT";
    FilterTypes[FilterTypes["FLOAT"] = 2] = "FLOAT";
})(FilterTypes || (FilterTypes = {}));
var ClearTypes;
(function (ClearTypes) {
    ClearTypes[ClearTypes["STRING"] = 0] = "STRING";
    ClearTypes[ClearTypes["EMAIL"] = 1] = "EMAIL";
    ClearTypes[ClearTypes["INT"] = 2] = "INT";
    ClearTypes[ClearTypes["FLOAT"] = 3] = "FLOAT";
    ClearTypes[ClearTypes["SEO_URL"] = 4] = "SEO_URL";
    ClearTypes[ClearTypes["ALPHABETS"] = 5] = "ALPHABETS";
})(ClearTypes = exports.ClearTypes || (exports.ClearTypes = {}));
class Variable {
    static Clear(variable, type = ClearTypes.STRING, clear_html_tags = false) {
        variable = (typeof variable != "undefined") ? variable : null;
        if (variable !== null) {
            variable = (clear_html_tags) ? variable.toString().stripTags() : variable;
            if (isNaN(variable)) {
                variable = variable.toString().trim();
            }
            switch (type) {
                case ClearTypes.INT:
                    // @ts-ignore
                    variable = Number.parseInt(Variable.filter_var(variable, FilterTypes.INT));
                    break;
                case ClearTypes.FLOAT:
                    // @ts-ignore
                    variable = Number.parseFloat(Variable.filter_var(variable, FilterTypes.FLOAT));
                    break;
                case ClearTypes.ALPHABETS:
                    variable = variable.replace(/[^a-zA-ZğüşöçİĞÜŞÖÇ\w ]/g, "");
                    break;
                case ClearTypes.EMAIL:
                    variable = Variable.filterVar(variable, FilterTypes.EMAIL);
                    break;
                case ClearTypes.SEO_URL:
                    variable = variable.toString().convertSEOUrl();
                    break;
            }
        }
        return variable;
    }
    static ClearAllData(data, not_column = []) {
        if (!this.isSet(() => data))
            return false;
        // @ts-ignore
        for (let [key, _1] of Object.entries(data)) {
            // @ts-ignore
            if (not_column.includes(key))
                continue;
            let clear_type = ClearTypes.STRING;
            if (!this.isEmpty(_1)) {
                if (typeof _1 === "object") {
                    this.ClearAllData(_1);
                    continue;
                }
                if (!isNaN(Number(_1))) {
                    if (Number(_1).isInt())
                        clear_type = ClearTypes.INT;
                    else if (Number(_1).isFloat())
                        clear_type = ClearTypes.FLOAT;
                }
            }
            data[key] = this.Clear(_1, clear_type, true);
        }
        return data;
    }
    static isSet(...variable) {
        let result;
        try {
            for (let i = 0; i < variable.length; i++) {
                result = variable[i]();
            }
        }
        catch (e) {
            result = undefined;
        }
        finally {
            return result !== undefined;
        }
    }
    static isEmpty(...variable) {
        for (let i = 0; i < variable.length; i++) {
            if (!this.isSet(() => variable[i]) ||
                variable[i] === null ||
                variable[i].length === 0 ||
                !variable[i].toString().trim())
                return true;
        }
        return false;
    }
    static setDefault(variable, default_value) {
        return (this.isSet(variable)) ? variable() : default_value;
    }
    static filterVar(variable, filter_type) {
        let regex;
        // Check Filter Type
        switch (filter_type) {
            case FilterTypes.EMAIL:
                regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
                break;
            case FilterTypes.INT:
                regex = /([0-9]+)/g;
                break;
            case FilterTypes.FLOAT:
                regex = /[+-]?([0-9]*[.])[0-9]+/g;
        }
        // Check Defined
        let match;
        if ((match = regex.exec(variable)) != null) {
            variable = match[0];
        }
        else {
            variable = "";
        }
        return variable;
    }
}
exports.default = Variable;
