import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IEvent, IPost} from '../../common/define-types';
import {ISite} from './../../common/define-types';

export interface sitesState {
  sites: ISite[];
  events: IEvent[];
  post: IPost[];
}

export const initialState: sitesState = {
  sites: [],
  events: [],
  post: [],
};

export const siteSlice = createSlice({
  name: 'sites',
  initialState,
  reducers: {
    setSites: (state, action: PayloadAction<ISite[]>) => {
      state.sites = action.payload;
    },
    setEvents: (state, action: PayloadAction<IEvent[]>) => {
      state.events = action.payload;
    },
    setPost: (state, action: PayloadAction<IPost[]>) => {
      state.post = action.payload;
    },
    resetValue: state => {
      state.sites = [];
      state.events = [];
      state.post = [];
    },
    addSite: (state, action: PayloadAction<ISite>) => {
      state.sites.push(action.payload);
    },
    addPost: (state, action: PayloadAction<IPost>) => {
      state.post.push(action.payload);
    },
    addEvent: (state, action: PayloadAction<IEvent>) => {
      state.events.push(action.payload);
    },
  },
});

export const {
  setSites,
  setEvents,
  setPost,
  resetValue,
  addSite,
  addPost,
  addEvent,
} = siteSlice.actions;
export const SiteReducer = siteSlice.reducer;
