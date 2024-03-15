// Commonly used Utility Types

interface Assignment {
  studentID: string;
  title: string;
  grade: number;
  verified?: boolean;
}

// Partial utility type
// creates a new type where all properties of input type are set to optional

const updateAssignment = (
  assign: Assignment,
  propsToUpdate: Partial<Assignment>
): Assignment => {
  return {
    ...assign,
    ...propsToUpdate,
  };
};

const assign1: Assignment = {
  studentID: 'compsci123',
  title: 'Final Project',
  grade: 0,
};

// updating only the grade property
const assignGraded = updateAssignment(assign1, { grade: 95 });

// Required utility type
// creates a new type where all properties of input type are set to required

const recordAssignment = (assign: Required<Assignment>): Assignment => {
  // send to database, etc
  return assign;
};

const assign2 = recordAssignment({ ...assign1, verified: false });

// Readonly utility type
// creates a new type where all properties of input type are set to readonly

const assignVerified: Readonly<Assignment> = {
  ...assign2,
  verified: true,
};

// Record utility type --> Record<K, V>
// creates an object type where property keys are type K and property values are type V

type Students = 'Sara' | 'Kelly';
type LetterGrades = 'A' | 'B' | 'C' | 'D' | 'U';

const finalGrades: Record<Students, LetterGrades> = {
  Sara: 'B',
  Kelly: 'U',
};

// Using Records with interfaces
interface Grades {
  assign1: number;
  assign2: number;
}

const gradeData: Record<Students, Grades> = {
  Sara: {
    assign1: 85,
    assign2: 93,
  },
  Kelly: {
    assign1: 67,
    assign2: 76,
  },
};

// Pick utility type --> Pick<Type, Keys>
// creates a type by picking selected properties Keys from Type

type AssignResult = Pick<Assignment, 'studentID' | 'grade'>;

const score: AssignResult = {
  studentID: 'k123',
  grade: 85,
};

// Omit utility type --> Omit<Type, Keys>
// creates a type by omitting selected properties Keys from Type

type AssignPreview = Omit<Assignment, 'grade' | 'verified'>;

const preview: AssignPreview = {
  studentID: 'k123',
  title: 'Final Project',
};

// Extract utility type
// extracts specific members from a union type

type AllNums = 1 | 2 | 3 | 4 | 5;

type EvenNums = Extract<2 | 4, AllNums>;

// Exclude utility type
// excludes specific members from a union type

type OddNums = Exclude<AllNums, 2 | 4>;

// NonNullable utility type --> NonNullable<Type>
// creates a type by excluding null and undefined from Type

type AllPossibleGrades = 'A' | 'B' | 'C' | 'D' | null | undefined;

type NonNullishGrades = NonNullable<AllPossibleGrades>;

// ReturnType utility type
// creates a type that is a return type of Function type

const createNewObj = (name: string, age: number, canDrive: boolean) => {
  return { name, age, canDrive };
};

type NewObj = ReturnType<typeof createNewObj>;

const obj1: NewObj = createNewObj('Jackson', 25, true);

// Parameters utility type
// constructs a tuple type from the types used in the parameters of a function type

type AssignParams = Parameters<typeof createNewObj>;

const assignArgs: AssignParams = ['Angel', 24, false];

const obj2: NewObj = createNewObj(...assignArgs);

// Awaited utility type
// ReturnType does not give the actual return type when used on an async function
// Awaited unwraps value type that the Promise resolves to

interface User {
  id: number;
  username: string;
  email: string;
}

const fetchUsers = async function (): Promise<User[]> {
  const data = await fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .catch((err) => console.log(err.message));
  return data;
};

type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUsers>>;
