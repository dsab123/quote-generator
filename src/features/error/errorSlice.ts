import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Error, STATUS_OK } from '../../types';

const initialState: Error = {
    statusCode: STATUS_OK,
    message: '',
    isResolved: true
}

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        raiseError: (state, action: PayloadAction<Error>) => {
            state.statusCode = action.payload.statusCode;
            state.message = action.payload.message;
            state.isResolved = false;
        },
        dismissError: state => {
            state.isResolved = true;
        }
    }
});

export const { raiseError, dismissError } = errorSlice.actions;

// this would be the mapper
export const selectError = (state: RootState) => state.error;

export default errorSlice.reducer;

