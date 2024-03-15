// Generics - placeholders for a future type to be passed in

// generic function that accepts an array of any type
function getFirstElement<T>(arg: T[]) {
  return arg[0];
}

const firstNum = getFirstElement([1, 2, 3]);
const firstString = getFirstElement(['1', '2', '3']);

// explicitly defining generic type
const firstNum2 = getFirstElement<number>([2, 3, 4]);

// generic types
type APIResponse<T> = {
  data: T;
  isError: boolean;
};

const response: APIResponse<string> = {
  data: 'success',
  isError: false,
};

// definining a specific API response
type PersonResponse = APIResponse<{ name: string; age: number }>;

const response3: PersonResponse = {
  data: {
    name: 'Samuel',
    age: 20,
  },
  isError: false,
};

// passing default types to a generic
type StatusResponse<Data = { status: number }> = {
  data: Data;
  isError: boolean;
};

const result: StatusResponse = {
  data: {
    status: 404,
  },
  isError: true,
};

// enforcing a type for a generic and a default value
type StatusResponse2<Data extends object = { status: number }> = {
  data: Data;
  isError: boolean;
};

// generic interface

// a general Job interface
interface Job {
  name: string;
  start: () => void;
  state: 'incomplete' | 'success' | 'failure';
}

// generic interface JobRun 
// a generic constraint is set that only accepts a generic type J that is a subtype of Job
interface JobRun<J extends Job> {
  job: J;
  state: 'queued' | 'running' | 'completed';
  onComplete: (callbackFn: (job: J) => void) => void;
}

interface SendEmailJob extends Job {
  recipientEmail: string;
  subject: string;
}

// generic Type T subtype of Job will be used for the type for JobRun
function enqueueJob<T extends Job>(job: T): JobRun<T> {
  // queue logic here...
  return {
    job,
    state: 'queued',
    onComplete: (cb: (job: T) => void) => cb(job),
  };
}

const j: SendEmailJob = {
  name: 'Bob',
  start: () => undefined,
  state: 'success',
  recipientEmail: 'bob@doe.com',
  subject: 'hi there',
};

const run = enqueueJob(j);

const jobName = run.job; // SendEmailJob type
const states = run.state; // 'queued' | 'running' | 'completed'

// conditional types with generics
interface Item {
  id: number;
  name: string;
}

type CheckType<T> = T extends Item ? Item : T;

const result2: CheckType<Item> = {
  id: 0,
  name: 'Jess',
};

const result3: CheckType<string> = 'hello world';
