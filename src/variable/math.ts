declare global {
    interface Math {
        Random(min: number, max: number): Number
    }
}

Math.Random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export default {}