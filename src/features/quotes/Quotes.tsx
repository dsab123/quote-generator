import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadQuotesAsync, selectQuote, selectQuotes } from './quotesSlice';
import { initialButtonText } from '../background/backgroundSlice';
import 'tailwindcss/tailwind.css';

export function Quotes() {
    const quotesState = useSelector(selectQuotes);
    const dispatch = useDispatch();

    return <>
        <div className="flex-col w-500px mt-3">
            <button
                className="bg-blue-400 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                onClick={() => dispatch(loadQuotesAsync())}>
                    {initialButtonText}
            </button>
            <div>
                {quotesState.data.map((quote, index) => (
                    <button key={quote.id}
                        className="text-white font-bold bg-blue-200 mb-1 rounded" 
                        onClick={() => {
                            console.log('clicked'); 
                            dispatch(selectQuote(index))
                        }}
                    >
                        {quote.quote}
                    </button>
                ))}
            </div>
        </div>
    </>
}