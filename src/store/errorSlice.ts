import { 
    createSlice, 
    PayloadAction 
} from '@reduxjs/toolkit';
import { RootState } from '.';
import { Error, OK_STATUS } from 'types';

const initialState: Error = {
    statusCode: OK_STATUS,
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

