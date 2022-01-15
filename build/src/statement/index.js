"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Statement {
    /**
     * @param _value
     * Checks your entered value Ex: if(_value === case_key)
     * @param _case
     * Usage: [ ["default", () => any] ]
     * @returns
     */
    static Switch(_value, _case = [["default", () => false]]) {
        let result = null, default_value = null;
        // @ts-ignore
        for (let [key, value] of Object.entries(_case)) {
            key = value[0];
            if (key === "default" && result === null) {
                default_value = value[1];
            }
            else if (_value === key) {
                result = value[1]();
            }
        }
        return result !== null ? result : default_value();
    }
    /**
     *
     * @param data
     * @param _function
     * Usage: (key: any, value: any) => {}
     */
    static Foreach(data, _function) {
        // @ts-ignore
        for (let [key, value] of Object.entries(data)) {
            _function(key, value);
        }
    }
}
exports.default = Statement;
