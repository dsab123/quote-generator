import { configureStore, ThunkAction, Action, applyMiddleware, Middleware } from '@reduxjs/toolkit';
import backgroundReducer from '../features/background/backgroundSlice';
import errorReducer from '../features/error/errorSlice';
import quotesReducer from '../features/quotes/quotesSlice';
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
    background: backgroundReducer,
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
