import { LOGIC_ERROR_MESSAGE, LOGIC_ERROR_STATUS, INTERNAL_ERROR_MESSAGE, INTERNAL_ERROR_STATUS } from './../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { raiseError } from '../error/errorSlice';
import { Quotes } from '../../types';
import { fetchQuotes } from '../../utils/Fauna';   

const initialState: Quotes = {
    data: [],
    selectedIndex: 0
}

export const quotes = createSlice({
    name: 'quotes',
    initialState,
    reducers: {
        loadQuotes: (state, action: PayloadAction<Quotes>) => {
            state.data = action.payload.data;
        },
        updateQuoteIndex: (state, action: PayloadAction<number>) => {
            state.selectedIndex = action.payload;
        }
    }
});

export const { loadQuotes, updateQuoteIndex } = quotes.actions;

export const loadQuotesAsync = (): AppThunk => async (dispatch, getState, axios) => {
    try {
        const quotes = await fetchQuotes();

        dispatch(loadQuotes({
            data: quotes
        } as Quotes));
    } catch (reason) {
        return dispatch(raiseError({
            statusCode: INTERNAL_ERROR_STATUS,
            message: INTERNAL_ERROR_MESSAGE
        }));
    }
};

export const selectQuote = (index: number): AppThunk => async (dispatch, getState) => {
    const data = getState().quotes.data;
    
    if (!data.length || index >= data.length) {
        dispatch(raiseError({
            statusCode: LOGIC_ERROR_STATUS,
            message: LOGIC_ERROR_MESSAGE
        }));

        // cover over this error, reset the index
        return dispatch(updateQuoteIndex(0));
    }

    return dispatch(updateQuoteIndex(index));
}

// this would be the mapper
export const selectQuotes = (state: RootState) => state.quotes;
export default quotes.reducer;