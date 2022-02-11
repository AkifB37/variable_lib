import {DateMask} from "../server/variable";
import {Statement} from "../index";



let string = `test`;
string.replaceAll(`t`, `e`);

let number = 10;
let str = `hello my friend I'm good `;

console.log('Number isInt: ',number.isInt())
console.log('Number isFloat: ',number.isFloat())
console.log('String Encode: ',str.Encode())



let date = new Date();
console.log(date, date.getStringWithMask(DateMask.ALL));

let c = Statement.Switch(number, [
    [1, () => false],
    [2, () => false],
    [10, () => true],
    [`default`, () => null]
])

console.log(c);


Statement.Foreach([0,2,3], (key: any, value: any) => {
    console.log(value)
})

