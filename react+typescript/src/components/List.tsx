import { ReactNode } from 'react';

interface ListProps<T> {
  items: Array<T>;
  render: (item: T) => ReactNode;
}

function List<T>({ items, render }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, idx) => {
        return <li key={idx}>{render(item)}</li>;
      })}
    </ul>
  );
}

export default List;
