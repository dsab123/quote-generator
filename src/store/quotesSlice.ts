import { 
    LOGIC_ERROR_MESSAGE, 
    LOGIC_ERROR_STATUS, 
    INTERNAL_ERROR_MESSAGE, 
    INTERNAL_ERROR_STATUS 
} from 'types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from 'store';
import { raiseError } from 'store/errorSlice';
import { Quotes } from 'types';
import { myFaunaClient } from 'utils/Fauna';

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
        setQuoteIndex: (state, action: PayloadAction<number>) => {
            state.selectedIndex = action.payload;
        },
        setRandomQuoteIndex: (state) => {
            // returns an index within our data array bounds
            let candidateIndex = 0;

            while(candidateIndex === state.selectedIndex) {
                candidateIndex = Math.abs(Math.floor(Math.random() * state.data.length - 1))
            }

            state.selectedIndex = candidateIndex;
        },
        setNextQuoteIndex: (state) => {
            state.selectedIndex = Math.abs((state.selectedIndex + 1) % state.data.length);
        },
        setPreviousQuoteIndex: (state) => {
            if (state.selectedIndex === 0) {
                state.selectedIndex = state.data.length - 1
            } else {
                state.selectedIndex = Math.abs((state.selectedIndex - 1) % state.data.length);
            }
        },
        setItalics: (state, action: PayloadAction<boolean>) => {
            const selectedQuote = state.data[state.selectedIndex];
            selectedQuote.isItalics = action.payload as boolean;
        },
        setBold: (state, action: PayloadAction<boolean>) => {
            const selectedQuote = state.data[state.selectedIndex];
            selectedQuote.isBold = action.payload as boolean;
        },
        setUnderlined: (state, action: PayloadAction<boolean>) => {
            const selectedQuote = state.data[state.selectedIndex];
            selectedQuote.isUnderlined = action.payload as boolean;
        },
        increaseLeftPercentage: (state) => {
            const selectedQuote = state.data[state.selectedIndex];
            selectedQuote.leftPercentage += 5;
        },
        decreaseLeftPercentage: (state) => {
            const selectedQuote = state.data[state.selectedIndex];
            selectedQuote.leftPercentage -= 5;
        },
        increaseTopPercentage: (state) => {
            const selectedQuote = state.data[state.selectedIndex];
            selectedQuote.topPercentage += 5;
        },
        decreaseTopPercentage: (state) => {
            const selectedQuote = state.data[state.selectedIndex];
            selectedQuote.topPercentage -= 5;
        }
    }
});

export const { 
    loadQuotes, 
    setQuoteIndex, 
    setRandomQuoteIndex, 
    setNextQuoteIndex, 
    setPreviousQuoteIndex, 
    setItalics, 
    setUnderlined, 
    setBold,
    increaseLeftPercentage,
    decreaseLeftPercentage,
    increaseTopPercentage,
    decreaseTopPercentage
} = quotes.actions;

export const loadQuotesAsync = (quotesClient: any = myFaunaClient): AppThunk => async (dispatch, getState, axios) => {
    try {
        const quotes = await quotesClient.fetchQuotes();

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
        return dispatch(setQuoteIndex(0));
    }

    return dispatch(setQuoteIndex(index));
}

// this would be the mapper
export const selectQuotes = (state: RootState) => state.quotes;
export default quotes.reducer;