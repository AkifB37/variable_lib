declare global {
    interface String {
        replaceAll(find: string, replace: string): string
        replaceArray(find: Array<string>, replace: Array<string>): string
        removeLastChar(remove_count?: number): string
        Encode(): string
        Decode(): string
        convertKey(): string
        stripTags(): string
        convertSEOUrl(): string
    }
}

String.prototype.replaceArray = function (find, replace) {
    let replaceString = this;
    for (let i = 0; i < find.length; i++) {
        replaceString = replaceString.replaceAll(find[i], replace[i]);
    }
    return replaceString.toString();
}
String.prototype.removeLastChar = function (remove_count = 1) {
    return this.slice(0,remove_count * -1);
}
String.prototype.Encode = function () {
    return encodeURIComponent(this.toString());
}
String.prototype.Decode = function () {
    return decodeURIComponent(this.toString());
}
String.prototype.convertKey = function () {
    return unescape(encodeURIComponent(this.convertSEOUrl()));
}
String.prototype.stripTags = function () {
    return this.replace(/<\/?[^>]+>/gi, '');
}
String.prototype.convertSEOUrl = function () {
    let $this = this.toString();
    $this = $this.toString().toLowerCase().trim().stripTags();
    $this = $this.replace("'", '');
    let tr = Array('ş','Ş','ı','I','İ','ğ','Ğ','ü','Ü','ö','Ö','Ç','ç','(',')','/',':',',','!');
    let eng = Array('s','s','i','i','i','g','g','u','u','o','o','c','c','','','_','_','','');
    $this = $this.replaceArray(tr, eng);
    $this = $this.replace(/[^-\w\s]/g, ''); // Remove unneeded characters
    $this = $this.replace(/^\s+|\s+$/g, ''); // Trim leading/trailing spaces
    $this = $this.replace(/[-\s]+/g, '-'); // Convert spaces to hyphens
    return $this;
}

export default {}