import {Action, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {filter, map, OperatorFunction} from 'rxjs';
import {RootState} from '../reducers';
import {ItemType} from 'antd/es/breadcrumb/Breadcrumb';

export interface ControlState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
  title: string;
  isCollab: boolean;
  isLoading: boolean;
  items: ItemType[];
}

const initialState: ControlState = {
  value: 0,
  status: 'idle',
  title: '',
  isCollab: false,
  isLoading: false,
  items: [],
};

export const controlSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state, action: PayloadAction<number | null | undefined>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value +=
        action.payload != null && action.payload > 0 ? action.payload : 1;
    },
    decrement: (state, action: PayloadAction<number | null | undefined>) => {
      state.value -=
        action.payload != null && action.payload > 0 ? action.payload : 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setCollab: (state, action: PayloadAction<boolean>) => {
      state.isCollab = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    pushBreadcrum: (state, action: PayloadAction<ItemType[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  setTitle,
  setCollab,
  setLoading,
  pushBreadcrum,
} = controlSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.control.value;
const incrementIfOdd$ = (action$: {
  pipe: (
    arg0: OperatorFunction<
      Action<unknown>,
      {payload: number | null | undefined; type: 'counter/increment'}
    >,
    arg1: OperatorFunction<
      number,
      {payload: number; type: 'counter/incrementByAmount'}
    >,
  ) => any;
}) =>
  action$.pipe(
    filter(increment.match),
    map((re: number) => {
      var count = 0;
      if (re % 2 === 1) {
        count = re;
      }
      return controlSlice.actions.incrementByAmount(count);
    }),
  );
export const ControlEpics = [incrementIfOdd$];
export const controlReducer = controlSlice.reducer;
