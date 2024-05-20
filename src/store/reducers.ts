import {combineReducers} from '@reduxjs/toolkit';
import {combineEpics} from 'redux-observable';
import {LoginEpics, loginReducer} from './epics/LoginEpic';
import {persistReducer} from './epics/PersistToSave';
import {SiteReducer} from './slices/siteSlices';

const rootReducer = combineReducers({
  login: loginReducer,
  site: SiteReducer,
  persist: persistReducer,
});

export const rootEpic = combineEpics(...LoginEpics);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
