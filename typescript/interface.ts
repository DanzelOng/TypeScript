// Interfaces
// interfaces are defined using the interface keyword
// interfaces define the structure or shape of an object

// defining an object type
interface IUser {
  readonly name: string;
  age: number;
  isActive: boolean;
  // define an optional property
  hello?(arg: string): void;
}

const user: IUser = {
  name: 'David',
  age: 20,
  isActive: false,
  hello(text) {
    console.log(text);
  },
};

// define function signature
interface mathFunction {
  (num1: number, num2: number): number;
}

// interface extension - interfaces can extend properties from another interface
interface IVehicle {
  wheels: number;
  model?: string;
}

interface IElectricCar extends IVehicle {
  power: 'electricity';
}

const car: IElectricCar = {
  wheels: 4,
  model: 'Tesla',
  power: 'electricity',
};

// interface merging - the same interface declared more than once will be merged, combining properties
interface ICustomer {
  name: string;
}

interface ICustomer {
  createdAt: Date;
}

const customer: ICustomer = {
  name: 'Andrew',
  createdAt: new Date(),
};
