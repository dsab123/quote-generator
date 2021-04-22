import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { raiseError } from '../error/errorSlice';
import { Quotes } from '../../types';
import { fetchQuotes } from '../../utils/Fauna';   

const initialState: Quotes = {
    data: [],
    selectedQuoteIndex: 0,
    isLoaded: false
}

export const quotes = createSlice({
    name: 'Quotes',
    initialState,
    reducers: {
        loadQuotes: (state, action: PayloadAction<Quotes>) => {
            state.data = action.payload.data;
        },
        selectQuote: (state, action: PayloadAction<number>) => {
            console.log(`payload is: ${action.payload}`);
            state.selectedQuoteIndex = action.payload;
            state.isLoaded = true;
        }
    }
});

export const { loadQuotes, selectQuote } = quotes.actions;

export const loadQuotesAsync = (): AppThunk => async dispatch => {
    try {
        const quotes = await fetchQuotes();

        dispatch(loadQuotes({
            data: quotes
        } as Quotes));
    } catch (reason) {
        return dispatch(raiseError({
            statusCode: 500,
            message: reason + " or something"
        }));
    }
};


// this would be the mapper
export const selectQuotes = (state: RootState) => state.quotes;
export default quotes.reducer;