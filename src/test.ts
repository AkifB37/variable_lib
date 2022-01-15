import V, {DateMask} from "./server/variable";
import S from "./server/statement";
(new V())

let string = `test`;
string.replaceAll(`t`, `e`);

let number = 10;
number.isInt();

let c = S.Switch(number, [
    [1, () => false],
    [2, () => false],
    [10, () => true],
])

S.Foreach([0,2,3], (key: any, value: any) => {
    console.log(value)
})

