// Visibility modifiers
// public members - accessible everywhere, outside and within the class
// private members - only be accessed within the class it is declared
// protected members - can be accessed in subclasses and its own class
// readonly members - value cannot be modified

class Coder {
  constructor(
    public readonly name: string,
    public music: string,
    private age: number,
    protected lang: string = 'TypeScript'
  ) {
    this.name = name;
    this.music = music;
    this.age = age;
    this.lang = lang;
  }

  public getAge() {
    return `I am ${this.age} years old!`;
  }
}

class WebDev extends Coder {
  constructor(
    public computer: string,
    name: string,
    music: string,
    age: number
  ) {
    super(name, music, age);
    this.computer = computer;
  }

  public getLang() {
    return `I write ${this.lang}!`;
  }
}

const Sara = new WebDev('Mac', 'Sara', 'lofi', 23);
console.log(Sara.getLang());
console.log(Sara.getAge());

// public attribute
console.log(Sara.music);

// defining an interfaces for the class
interface Musician {
  name: string;
  instrument: string;
  play(action: string): string;
}

// enforcing the interface on the class
class Guitarist implements Musician {
  constructor(public name: string, public instrument: string) {
    this.name = name;
    this.instrument = instrument;
  }

  public play(action: string) {
    return `${this.name} ${action} the ${this.instrument}`;
  }
}

const Page = new Guitarist('Jimmy', 'guitar');
console.log(Page.play('strums'));

// static members - not associated with instances, only accessible through class constructor object

class MyClass {
  // defining a private static property
  private static count: number = 0;

  constructor(public name: string) {
    this.name = name;
    ++MyClass.count;
    // private static members can be accessed within its own class
    console.log(MyClass.count);
  }

  // define a protected static method
  protected static displayInfo() {
    console.log(
      `${MyClass.count} ${
        MyClass.count > 1 ? 'objects' : 'object'
      } was created from MyClass`
    );
  }
}

class MyClass2 extends MyClass {
  constructor(name: string) {
    super(name);
    // protected static method is inherited and can be accessed in MyClass2
    MyClass.displayInfo();
  }
}

const dave = new MyClass2('Dave');
const jack = new MyClass2('Jack');
