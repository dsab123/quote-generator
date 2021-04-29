import { dismissError, raiseError } from 'store/errorSlice';
import errorReducer from 'store/errorSlice';
import { 
    Error, 
    LOGIC_ERROR_MESSAGE, 
    LOGIC_ERROR_STATUS 
} from 'types';

const initialState: Error = {
    statusCode: 200,
    message: 'error',
    isResolved: true
}

describe('errorSlice tests', () => {
    it('raiseError reducer - error state applied', () => {
        const state = errorReducer(initialState, raiseError({
            statusCode: LOGIC_ERROR_STATUS,
            message: LOGIC_ERROR_MESSAGE
        }));

        expect(state.message).toEqual(LOGIC_ERROR_MESSAGE);
        expect(state.isResolved).toBeFalsy();
        expect(state.statusCode).toBe(LOGIC_ERROR_STATUS)
    });

    it('dismissError reducer - error is dismissed', () => {
        const state = errorReducer(initialState, dismissError);

        expect(state.isResolved).toBeTruthy();
    });
})