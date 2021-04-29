import { configureStore, ThunkAction, Action, Middleware } from '@reduxjs/toolkit';
import errorReducer from './errorSlice';
import backgroundsReducer from './backgroundsSlice';
import quotesReducer from './quotesSlice';
import thunk from 'redux-thunk';
import axios from 'axios';

let middleware: Array<Middleware> = [];
middleware.push(thunk.withExtraArgument(axios));

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    backgrounds: backgroundsReducer,
    error: errorReducer,
    quotes: quotesReducer
  },
  middleware: middleware
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
