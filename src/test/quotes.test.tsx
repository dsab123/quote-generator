import { PayloadAction } from '@reduxjs/toolkit';
import quotesReducer, { setNextQuoteIndex, updateRandomQuoteIndex } from '../features/quotes/quotesSlice';
import { selectQuote, loadQuotes, updateQuoteIndex, loadQuotesAsync } from '../features/quotes/quotesSlice';
import { Quotes, LOGIC_ERROR_STATUS, LOGIC_ERROR_MESSAGE, INTERNAL_ERROR_MESSAGE, Quote, INTERNAL_ERROR_STATUS } from '../types';

const initialState: Quotes = {
    data: [],
    selectedIndex: 0
}

const newState: Quotes = {
    data: [
        {
            id: 1,
            author: 'author-1',
            quote: 'quote-1'
        },
        {
            id: 2,
            author: 'author-2',
            quote: 'quote-2'
        },
        {
            id: 3,
            author: 'author-3',
            quote: 'quote-3'
        },
    ],
    selectedIndex: 0
};

function createQuotesClientMock(): any {
    return {
        fetchQuotes: () => {
            return newState.data;
        }
    }
}

const getState = () => {};
const fulfilled = {get: () => Promise.resolve({data: [{}]})};

describe('quotesSlice tests', () => {
    it('loadQuotes reducer - data is updated', () => {
        const state = quotesReducer(initialState, loadQuotes(newState));

        expect(state.data.length).toBe(3);
        expect(state.data[0].quote).toBe('quote-1');
        expect(state.data[1].quote).toBe('quote-2');
        expect(state.data[2].quote).toBe('quote-3');
      });
      
    it('updateQuoteIndex reducer - index is updated', () => {
        const state = quotesReducer(initialState, updateQuoteIndex(3));
        
        expect(state.selectedIndex).toBe(3);
    });

    it('updateRandomQuoteIndex reducer - new index is not old index', () => {
        const state = quotesReducer(initialState, updateRandomQuoteIndex());
        
        expect(state.selectedIndex).not.toBe(0);
    });

    it('setNextQuoteIndex reducer - end to next index goes to zero', () => {
        const state = quotesReducer(initialState, setNextQuoteIndex());
        
        expect(state.selectedIndex).not.toBe(0);
    });

    it('setNextQuoteIndex reducer - next index goes up', () => {
        
    });

    it('setPreviousQuoteIndex reducer -  zero to previous index goes to end', () => {
        
    });

    it('setPreviousQuoteIndex reducer -  previous index goes down', () => {
        
    });

    it('selectQuote thunk - invalid index is caught', () => {
        let result: Array<PayloadAction> = [];
        
        const dispatch = (action: PayloadAction<any>) => result.push(action); 
        const getState = () => ({quotes: {...initialState}});
        const thunk: any = selectQuote(1);

        thunk(dispatch, getState);

        expect(result.length).toBe(2);
        expect(result[0].type).toBe('error/raiseError');
        expect(result[0].payload).toStrictEqual({
            message: LOGIC_ERROR_MESSAGE,
            statusCode: LOGIC_ERROR_STATUS
        });
        expect(result[1].type).toBe('quotes/updateQuoteIndex');
        expect(result[1].payload).toBe(0);
    });

    it('loadQuotesAsync thunk - valid result dispatches loadQuotes', async () => {
        let result: Array<PayloadAction> = [];

        const dispatch = (action: PayloadAction<any>) => result.push(action); 
        const getState = () => ({quotes: {...initialState}});
        const thunk: any = loadQuotesAsync(createQuotesClientMock());

        await thunk(dispatch, getState, fulfilled);

        expect(result.length).toBe(1);
        expect(result[0].type).toBe("quotes/loadQuotes");
    });

    it('loadQuotesAsync thunk - invalid result raises error', async () => {
        let result: Array<PayloadAction> = [];

        const dispatch = (action: PayloadAction<any>) => result.push(action); 
        const getState = () => ({quotes: {...initialState}});
        const thunk: any = loadQuotesAsync({}); // invalid mock

        await thunk(dispatch, getState, fulfilled);

        expect(result.length).toBe(1);
        expect(result[0].type).toBe("error/raiseError");
        expect(result[0].payload).toStrictEqual({
            message: INTERNAL_ERROR_MESSAGE,
            statusCode: INTERNAL_ERROR_STATUS
        });
    });
});