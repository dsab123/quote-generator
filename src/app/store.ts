import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import backgroundReducer from '../features/background/backgroundSlice';
import errorReducer from '../features/error/errorSlice';
import quoteReducer from '../features/quote/quoteSlice';

export const store = configureStore({
  reducer: {
    background: backgroundReducer,
    error: errorReducer,
    quote: quoteReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
