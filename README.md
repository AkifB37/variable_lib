# Prototypes

### Array & Objects
```ts
indexOfKey(key: string, value: any): Number
findSingle(key: string, value: any): object
findMulti(key: string, value: any): Array<any>
findMultiForObject(obj: Array<any>, find: any, type: 'number' | 'string'): Array<any>
orderBy(key: string, sort_type: `asc` | `desc`): Array<any>

//Usage --------------------------------------------------------------------    
let value: Array<any> = [{id:1,type:1},{id:2,type:2},{id:3,type:2}];
value.indexOfKey('id',2); //return 1.index
value.findSingle('id',2); //return {id:2,type:2}
value.findMulti('type',2); //return [{id:2,type:2},{id:3,type:2}]
value.orderBy('type','desc'); //return [{id:2,type:2},{id:3,type:2},{id:1,type:1}]
```


### Date
```ts
addDays(n: any): Date
nextDay() : Date
addMonths(n: any): Date
addYears(n: any): Date
getStringWithMask(mask: string | DateMask, utc?: boolean) : string
diffMinutes(date: Date): Number

//Usage --------------------------------------------------------------------    
let date = new Date();
data.addDays(1);
data.nextDay(1);
data.addMonths(1);
data.addYears(1);
data.getStringWithMask(DateMask.ALL);
data.diffMinutes(new Date());
```
### Math
```ts
Random(min: number, max: number): Number
Range(value:number,min: number, max: number,equal: boolean): Boolean

//Usage --------------------------------------------------------------------    
Math.Random(10,350); //return a number between 10 and 350
Math.Range(50,1,100); //return true
```
### Number
```ts
isInt(): boolean
isFloat(): boolean

//Usage --------------------------------------------------------------------    
let numb = 10;
numb.isInt(); //return true 
numb.isFloat(); //return false 
```
### String
```ts
replaceAll(find: string, replace: string): string
replaceArray(find: Array<string>, replace: Array<string>): string
removeLastChar(remove_count?: number): string
Encode(): string
Decode(): string
convertKey(): string
stripTags(): string
convertSEOUrl(): string
```
# Variables
### Variables Functions
```ts
Clear(variable: any, type: ClearTypes = ClearTypes.STRING, clear_html_tags = true) : any
ClearAllData(data: object | any, not_column: Array<string> = []) : object | any
isSet(...variable: any) : boolean
isEmpty(...variable: any) : boolean
setDefault(variable: any, default_value: any) : any
filterVar(variable: any, filter_type: FilterTypes) : string
```
### Variables Types
```ts
export enum FilterTypes {
    EMAIL,
    INT,
    FLOAT
}

export enum ClearTypes {
    STRING,
    EMAIL,
    INT,
    FLOAT,
    SEO_URL,
    ALPHABETS
}

export enum DateMask {
    ALL = "yyyy-mm-dd HH:MM:ss",
    UNIFIED_ALL = "yyyymmddHHMMss",
    DATE = "yyyy-mm-dd"
}
```

## Usage

```ts
import {DateMask,Statement,ClearTypes,User,Variabl} from 'ts-operator-lib'

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
```