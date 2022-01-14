declare global {
    interface String {
        replaceAll(find: string, replace: string): string
        replaceArray(find: Array<string>, replace: Array<string>): string
        removeLastChar(remove_count?: number): string
    }
}

String.prototype.replaceArray = function (find, replace) {
    let replaceString = this;
    for (let i = 0; i < find.length; i++) {
        replaceString = replaceString.replace(find[i], replace[i]);
    }
    return replaceString.toString();
}

String.prototype.removeLastChar = function (remove_count = 1) {
    return this.substring(this.length-1, remove_count * -1);
}

export default {}