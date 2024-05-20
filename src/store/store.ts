import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AnyAction,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createEpicMiddleware} from 'redux-observable';
import {persistReducer} from 'redux-persist';
import rootReducer, {RootState, rootEpic} from './reducers';

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['site', 'login', 'persist'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
    epicMiddleware,
  ],
});

epicMiddleware.run(rootEpic);
type AppDispatch = typeof store.dispatch;
export const useDispatchRoot = () => {
  const dispatch = useDispatch<AppDispatch>();
  const funcMemo = useCallback(
    (event: AnyAction) => {
      dispatch(event);
    },
    [dispatch],
  );
  return funcMemo;
};

export function useSelectorRoot<T>(fn: (store: RootState) => T): T {
  return useSelector(fn);
}
