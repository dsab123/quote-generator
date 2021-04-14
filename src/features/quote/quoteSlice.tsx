import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { raiseError } from '../error/errorSlice';
import { Quote } from '../../types';
import { getQuote } from '../../utils/Fauna';   

const initialState: Quote = {
    id: 0,
    author: '',
    quote: 'some quote by somebody'
};

// quote about fauna client I think
export const quote = createSlice({
    name: 'Quote',
    initialState,
    reducers: {
        changeQuote: (state, action: PayloadAction<Quote>) => {
            state.id = action.payload.id;
            state.author = action.payload.author;
            state.quote = action.payload.quote;
        }
    }
});

export const { changeQuote } = quote.actions;

// write fauna client and retrieval here
export const requestQuote = (): AppThunk => async dispatch => {
    try {
        // get fauna client
        const quote = await getQuote();

        dispatch(changeQuote({
            id: quote.id,
            author: quote.author,
            quote: quote.quote
        }))
    } catch (reason) {
        return dispatch(raiseError({
            statusCode: 500,
            message: reason + " or something"
        }));
    }

};


// this would be the mapper
export const selectQuote = (state: RootState) => state.quote;

export default quote.reducer;