declare global {
    interface Math {
        Random(min: number, max: number): Number
        Range(value:number,min: number, max: number,equal: boolean): Boolean
    }
}

Math.Random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
Math.Range = function (value,min, max,equal=false) {
    return (equal) ? ((value >= min) && (value <= max)) : ((value > min) && (value < max));
};

export default {}