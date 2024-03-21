import {
  createContext,
  useReducer,
  ChangeEvent,
  ReactElement,
  useCallback,
  useContext,
} from 'react';

///////////////// Reducer Set up //////////////

// initial reducer state obj
export const initialState = { count: 0, text: '' };

type StateType = typeof initialState;

const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_INPUT,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
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

///////////////// Context Set up //////////////

// create custom context
const useCounterContext = function (initState: StateType) {
  const [state, dispatch] = useReducer(reducer, initState);

  // memoize functions
  const increment = useCallback(function () {
    dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT });
  }, []);

  const decrement = useCallback(function () {
    dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT });
  }, []);

  const handleTextInput = useCallback(function (
    e: ChangeEvent<HTMLInputElement>
  ) {
    dispatch({ type: REDUCER_ACTION_TYPE.NEW_INPUT, payload: e.target.value });
  },
  []);

  return { state, increment, decrement, handleTextInput };
};

// define type of context state
type useCounterContextType = ReturnType<typeof useCounterContext>;

// define initial context state
const initialContextState: useCounterContextType = {
  state: initialState,
  increment: () => undefined,
  decrement: () => undefined,
  handleTextInput: (e: ChangeEvent<HTMLInputElement>) => {},
};

// create Context
export const CounterContext =
  createContext<useCounterContextType>(initialContextState);

// define children type for Context provider
type ChildrenType = {
  children?: ReactElement | undefined;
};

// create custom Context Provider
// wraps around consumer components
// packs the rest of the properties into an new object
export const CounterProvider = function ({
  children,
  ...initState
}: ChildrenType & StateType): ReactElement {
  return (
    <CounterContext.Provider value={useCounterContext(initState)}>
      {children}
    </CounterContext.Provider>
  );
};

// define counter hook type
type UseCounterHookType = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

// define custom counter hook
export const useCounter = function (): UseCounterHookType {
  const {
    state: { count },
    increment,
    decrement,
  } = useContext(CounterContext);
  return { count, increment, decrement };
};

// define text hook type
type UseCounterTextHookType = {
  text: string;
  handleTextInput: (e: ChangeEvent<HTMLInputElement>) => void;
};

// define custom text hook
export const useCounterText = function (): UseCounterTextHookType {
  const {
    state: { text },
    handleTextInput,
  } = useContext(CounterContext);
  return { text, handleTextInput };
};
