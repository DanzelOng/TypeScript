// basic types

// string type
let username: string = 'Dave';

// number type
const num: number = 50;

// boolean type
const isLoading: boolean = true;

// any type - indicate that value can be of any type
let apiResponseData: any;

// union types - indicate that the value can be of multiple types
let album: string | number;

// literal types
let membershipPlan: 'regular' | 'premium' | 'VIP';

// array type
let arrNumber: number[];
arrNumber = [2, 4, 5, 6];

// union types with arrays
let arrNumber2: (number | string)[];
arrNumber2 = ['1', 10, 4, '3'];

// tuple data type
let myTuple: [string, number, boolean] = ['Dave', 50, true];
myTuple[0] = 'Test';

// define types for an object
type Guitarist = {
  name: string;
  active: boolean;
  albums: (string | number)[];
};

let evh: Guitarist = {
  name: 'Eddie',
  active: false,
  albums: [1984, 5150, 'OU812'],
};

// never data type - indicate values that will never occur
// value never returns in endless while loop
function endlessLoop(): never {
  while (true) {
    console.log('This is an endless loop');
  }
}

// function that throws an exception will never return a value
function throwException(errMsg: string): never {
  throw new Error(errMsg);
}

// enums- TypeScript specific feature
// provide a concise way of defining collcections of related values or named constants
enum AccountType {
  PERSONAL = 'Personal',
  STARTUP = 'Startup',
  ENTERPRISE = 'Enterprise',
  CUSTOM = 'Custom',
}

console.log(AccountType.PERSONAL); // Personal
