import { PayloadAction } from '@reduxjs/toolkit';
import quotesReducer from '../features/quotes/quotesSlice';
import { selectQuote, loadQuotes, updateQuoteIndex, loadQuotesAsync } from '../features/quotes/quotesSlice';
import { Quotes, LOGIC_ERROR_STATUS, LOGIC_ERROR_MESSAGE, INTERNAL_ERROR_MESSAGE } from '../types';

const initialState: Quotes = {
    data: [],
    selectedIndex: 0
}

const newState: Quotes = {
    data: [{
        id: 1,
        author: 'author',
        quote: 'quote'
    }],
    selectedIndex: 0
};

const getState = () => {};
const fulfilled = {get: () => Promise.resolve({data: [{}]})};

describe('quotesSlice tests', () => {
    it('loadQuotes reducer - data is updated', () => {
        const state = quotesReducer(initialState, loadQuotes(newState));

        expect(state.data.length).toBe(1);
        expect(state.data[0].quote).toBe('quote');
      });
      
    it('updateQuoteIndex reducer - index is updated', () => {
        const state = quotesReducer(initialState, updateQuoteIndex(3));
        
        expect(state.selectedIndex).toBe(3);
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

    it('loadQuotesAsync thunk - ', async () => {
        // TODO figure out how to mock fauna client?
        
        // let result: Array<PayloadAction> = [];
        
        // const dispatch = (action: PayloadAction<any>) => result.push(action); 
        // const getState = () => ({quotes: {...initialState}});
        // const thunk: any = loadQuotesAsync();

        // await thunk(dispatch, getState, fulfilled);

        // expect(result.length).toBe(1);
        // expect(result[0].type).toBe("error/raiseError");
        // expect(result[0].payload).toStrictEqual({
        //     message: LOGIC_ERROR_MESSAGE,
        //     statusCode: LOGIC_ERROR_STATUS
        // });
        // expect(result[1].type).toBe("quotes/updateQuoteIndex");
        // expect(result[1].payload).toBe(0);
    });
});
