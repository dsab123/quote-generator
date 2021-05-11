import { PayloadAction } from '@reduxjs/toolkit';
import quotesReducer, { 
    setBold,
    setItalics, 
    setNextQuoteIndex, 
    setRandomQuoteIndex, 
    setUnderlined,
    increaseLeftPercentage, 
    increaseTopPercentage, 
    decreaseTopPercentage,
    decreaseLeftPercentage,
    setFontFamily
} from 'store/quotesSlice';
import { 
    selectQuote, 
    loadQuotes, 
    setQuoteIndex, 
    loadQuotesAsync 
} from 'store/quotesSlice';
import { 
    Quotes, 
    LOGIC_ERROR_STATUS, 
    LOGIC_ERROR_MESSAGE, 
    INTERNAL_ERROR_MESSAGE, 
    INTERNAL_ERROR_STATUS 
} from 'types';

const initialState: Quotes = {
    data: [],
    selectedIndex: 0
}

const newState: Quotes = {
    data: [
        {
            id: 1,
            author: 'author-1',
            quote: 'quote-1',
            isItalics: false,
            isBold: false,
            isUnderlined: false,
            topPercentage: 50,
            leftPercentage: 50,
            fontFamily: ''
        },
        {
            id: 2,
            author: 'author-2',
            quote: 'quote-2',
            isItalics: false,
            isBold: false,
            isUnderlined: false,
            topPercentage: 50,
            leftPercentage: 50,
            fontFamily: ''
        },
        {
            id: 3,
            author: 'author-3',
            quote: 'quote-3',
            isItalics: false,
            isBold: false,
            isUnderlined: false,
            topPercentage: 50,
            leftPercentage: 50,
            fontFamily: ''
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
      
    it('setQuoteIndex reducer - index is updated', () => {
        const state = quotesReducer(initialState, setQuoteIndex(3));
        
        expect(state.selectedIndex).toBe(3);
    });

    it('setRandomQuoteIndex reducer - new index is not old index', () => {
        const state = quotesReducer(initialState, setRandomQuoteIndex());
        
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


    it('increaseLeftPercentage - left percentage increased', () => {
        const state = quotesReducer(newState, increaseLeftPercentage());
        const quote = state.data[0];

        expect(quote.leftPercentage).toBe(55);
    });

    it('decreaseLeftPercentage - left percentage decreased', () => {
        const state = quotesReducer(newState, decreaseLeftPercentage());
        const quote = state.data[0];

        expect(quote.leftPercentage).toBe(45);
    });

    it('increaseTopPercentage - top percentage increased', () => {
        const state = quotesReducer(newState, increaseTopPercentage());
        const quote = state.data[0];

        expect(quote.topPercentage).toBe(55);
    });

    it('decreaseTopPercentage - top percentage decreased', () => {
        const state = quotesReducer(newState, decreaseTopPercentage());
        const quote = state.data[0];

        expect(quote.topPercentage).toBe(45);
    });

    it('setItalics reducer - sets italics on quote', () => {
        const state = quotesReducer(newState, setItalics(true));
        
        expect(state.data[state.selectedIndex].isItalics).toBe(true);
    });

    it('setItalics reducer - unsets italics on quote', () => {
        const state = quotesReducer(newState, setItalics(false));
        
        expect(state.data[state.selectedIndex].isItalics).toBe(false);
    });
    
    it('setUnderlined reducer - sets isUnderlined on quote', () => {
        const state = quotesReducer(newState, setUnderlined(true));
        
        expect(state.data[state.selectedIndex].isUnderlined).toBe(true);
    });

    it('setUnderlined reducer - unsets isUnderlined on quote', () => {
        const state = quotesReducer(newState, setUnderlined(false));
        
        expect(state.data[state.selectedIndex].isUnderlined).toBe(false);
    });

    it('setBold reducer - sets isBold on quote', () => {
        const state = quotesReducer(newState, setBold(true));
        
        expect(state.data[state.selectedIndex].isBold).toBe(true);
    });

    it('setBold reducer - unsets isBold on quote', () => {
        const state = quotesReducer(newState, setBold(false));
        
        expect(state.data[state.selectedIndex].isBold).toBe(false);
    });

    it('setFontFamily reducer - fontFamily is set', () => {
        const state = quotesReducer(newState, setFontFamily('fruitSalad'));
        
        expect(state.data[state.selectedIndex].fontFamily).toBe('fruitSalad');
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
        expect(result[1].type).toBe('quotes/setQuoteIndex');
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