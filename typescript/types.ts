// Type Aliases - provide custom naming to types that can be referenced repeatedly
// a type aliase is defined using the type keyword

// aliasing the string type
type UserID = number;

// referencing one type in another type
type StudentRecord = {
  id: UserID;
  name: string;
  yearEnrolled: number;
  gpa: number;
};

const dave: StudentRecord = {
  id: 298,
  name: 'dave',
  yearEnrolled: 2024,
  gpa: 3.4,
};

// describing function signatures using type aliasing
type mathFunction = (a: number, b: number) => number;

const multiplyNumbers: mathFunction = function (num1: number, num2: number) {
  return num1 + num2;
};

//  Union types
type User = { name: string } | { name: number };

// Intersecting mulitple types
type FrontendDeveloper = {
  languages: Array<string>;
  frameworks: Array<string>;
};

type BackendDeveloper = {
  languages: Array<string>;
  databases: Array<string>;
};

type FullStackDeveloper = FrontendDeveloper & BackendDeveloper;

const fullStackDev: FullStackDeveloper = {
  languages: ['HTML', 'CSS', 'JavaScript', 'Java'],
  frameworks: ['React', 'Angular'],
  databases: ['MySQL', 'MongoDB'],
};

// type assertions - cast a type of a value to be a more or less specific type
const inputEl = document.querySelector('.input') as HTMLInputElement;
const value = inputEl.value;

// non null assertions
const inputEl2 = document.querySelector('.input')!;

type One = string;
type Two = string | number;
type Three = 'hello';

let a: One = 'hello';
// type widening - the type of a value becomes less specific
let b = a as Two;
// type narrowing - narrowing down the type of a value to a more precise type
let c = a as Three;

// Double casting - casting a value from one type to another and casting it again to another type
let unknownVar: unknown = 'test';
let strVar = unknownVar as number;
