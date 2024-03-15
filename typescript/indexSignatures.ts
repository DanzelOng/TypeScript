// Index signatures
// used to define the type of an unknown object's property and value

interface IndexObj {
  // defining an index signature
  // defines key type of string and value of number type
  [key: string]: number;
}

// defining index signature with additional properties
interface TransactionObj {
  readonly [key: string]: number;
  pizza: number;
  books: number;
  job: number;
}

const todaysTransactions: TransactionObj = {
  pizza: 10,
  books: 5,
  job: 20,
};

// index signatures allow accessing of an object's properties dynamically
const todaysNet = (t: TransactionObj): number => {
  let total = 0;
  for (const transaction in t) total += t[transaction];
  return total;
};

console.log(todaysNet(todaysTransactions));

interface Student {
  // undefined has to be provided when defining optional properties
  [key: string]: string | number | Array<number> | undefined;
  name: string;
  gpa: number;
  classes?: Array<number>;
}

const student: Student = {
  name: 'Doug',
  gpa: 3.5,
  classes: [100, 200],
};

// Index signature caveats

// typescript considers all properties to be optional when using index signature
// accessing properties that are not explicitly defined in the interface won't raise a compile time error
// typescript infers the type to be any of the value type defined in the index signature
const grade = student.test;
console.log(grade); // runtime value --> undefined

// keyof assertions
// allows a object value to be accessed dynamically without an index signature
interface Student2 {
  name: string;
  gpa: number;
  classes?: Array<number>;
}

const student2: Student2 = {
  name: 'Jake',
  gpa: 3.3,
};

// keyof takes a type and returns a union of its keys
for (const key in student2) {
  console.log(`${key}: ${student2[key as keyof Student2]}`);
}

// typeof gets the type of a variable
for (const key in student2) {
  console.log(`${key}: ${student2[key as keyof typeof student2]}`);
}

const logStudentKey = (student: Student2, key: keyof Student2): void => {
  console.log(`Student ${key}: ${student[key]}`);
};

logStudentKey(student2, 'name');

// Record Utility Type - provide an alternative to defining index signatures
// allows a union of string literals to describe the keys

type Tiers = 'regular' | 'premium' | 'vip';

type MembershipPlans = Record<Tiers, number>;

// equivalent to
interface IMembershipPlans {
  regular: number;
  premium: number;
  vip: number;
}

const plan: MembershipPlans = {
  regular: 20,
  premium: 35,
  vip: 60,
};

// keyof assertion is required to access the object value dynamically
Object.keys(plan).map((key) => {
  console.log(plan[key as keyof MembershipPlans]);
});
