declare global {
    interface Number {
        isInt: () => boolean
        isFloat: () => boolean
    }
}

Number.prototype.isInt = function (): boolean{
    if (typeof this !== "number") return false;
    let n = this;
    return Number(n) === n && n % 1 === 0;
}

Number.prototype.isFloat = function (): boolean{
    if (typeof this !== "number") return false;
    let n  = this;
    return Number(n) === n && n % 1 !== 0;
}


export default class PanterNumber {}
