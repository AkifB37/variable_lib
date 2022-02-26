import Variable, {DateMask,Statement} from '../index'


let string = `test`;
string.replaceAll(`t`, `e`);

let number = 10;
let str = `iiüiüİÜ İÜ ĞÇÜİ,İ,Ü İÜİÜ,İÜ,e`;

console.log('Number isInt: ',number.isInt())
console.log('Number isFloat: ',number.isFloat())
console.log('String Encode: ',str.convertSEOUrl())

let a = {
    B: null,
    C: null,
    D: null
}
console.log('ISNULL',Variable.isNull(a.B,a.C,a.D))

let date = new Date();
console.log(date, date.getStringWithMask(DateMask.ALL));

let c = Statement.Switch(number, [
    [1, () => false],
    [2, () => false],
    [10, () => true],
    [`default`, () => null]
])
console.log(c);

let obj = [
    {id:1, name: 'Akif', email: 'example@exaple.com'},
    {id:2, name: 'Mert', email: 'example@exaple.com'},
    {id:3, name: 'Exam', email: 'example@exaple.com'},
]

Statement.Foreach({obj}, (key: any, value: any) => {
    console.log(value)
})

