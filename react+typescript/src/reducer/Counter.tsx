import { ReactNode, useReducer, ChangeEvent } from 'react';

type ChildrenType = {
  children: (num: number) => ReactNode;
};

// define initial reducer state obj
const initialState = { count: 0, text: '' };

// define type of state obj
type StateType = typeof initialState;

// define type for reducer actions
const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_INPUT,
}

// define type for action obj
type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  // define an optional payload property
  payload?: string | undefined;
};

const reducer = function (state: StateType, action: ReducerAction): StateType {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count++ };

    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count-- };

    case REDUCER_ACTION_TYPE.NEW_INPUT:
      return { ...state, text: action.payload ?? '' };

    default:
      throw new Error('Unknown Action');
  }
};

function Counter({ children }: ChildrenType) {
  const [{ count, text }, dispatch] = useReducer(reducer, initialState);

  const increment = function () {
    dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT });
  };

  const decrement = function () {
    dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT });
  };

  const handleTextInput = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: REDUCER_ACTION_TYPE.NEW_INPUT, payload: e.target.value });
  };

  return (
    <>
      <h1>{children(count)}</h1>
      <div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
      <input type='text' onChange={handleTextInput} />
      <h2>{text}</h2>
    </>
  );
}
export default Counter;
