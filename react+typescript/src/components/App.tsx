import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  MouseEvent,
  KeyboardEvent,
} from 'react';

import Heading from './Heading';
import Section from './Section';
import Counter from './Counter';
import List from './List';

// define User interface
interface User {
  id: string;
  username: string;
}

// define func signature
type fibFunc = (n: number) => number;

const fib: fibFunc = (n: number) => {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
};

function App() {
  const [count, setCount] = useState<number>(1);
  const [users, setUsers] = useState<User[] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // type guards for a possible null ref element
  console.log(inputRef?.current);
  console.log(inputRef?.current?.value);

  const myNum: number = 10;

  // memoize result
  const result = useMemo<number>(() => fib(myNum), [myNum]);

  // memoize callback function
  const displayInfo = useCallback(
    // specify event and element type
    (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
      console.log(e);
      console.log('I am clicked!');
    },
    []
  );

  useEffect(() => {
    console.log('mounting');
    console.log(`Users: ${users}`);
    return () => console.log('unmounting');
  }, [users]);

  return (
    <>
      <Heading title='Hello' />
      <Section title='Different Title'>This is my section</Section>
      <Counter setCount={setCount}>Count is {count}</Counter>
      <List
        items={['☕ Coffee', '🌮 Tacos', '💻 Code']}
        render={(item: string) => <span className='bold'>{item}</span>}
      />
      <p>{result}</p>
      <button onClick={displayInfo}>Click Me</button>
      <input ref={inputRef} type='text' />
    </>
  );
}

export default App;
