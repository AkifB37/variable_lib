declare global {
    interface String {
        replaceAll(find: string, replace: string): string
        replaceArray(find: Array<string>, replace: Array<string>): string
    }
}

String.prototype.replaceAll = function (find: string, replace: string) : string {
    let str = this.toString();
    return str.replace(new RegExp(find, 'g'), replace);
}
String.prototype.replaceArray = function(find:Array<string>, replace:Array<string>): string {
    let replaceString = this;
    for (let i = 0; i < find.length; i++) {
        replaceString = replaceString.replace(find[i], replace[i]);
    }
    return replaceString.toString();
};

export default class PanterString {}