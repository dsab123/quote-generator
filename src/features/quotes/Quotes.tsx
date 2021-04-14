import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadQuotesAsync, selectQuote, selectQuotes } from './quotesSlice';
import 'tailwindcss/tailwind.css';

export function Quotes() {
    const quotesState = useSelector(selectQuotes);
    const dispatch = useDispatch();


    return <>
        <div className="flex-col w-500px">
            <button
                className="bg-blue-400 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                onClick={() => dispatch(loadQuotesAsync())}>
                    load quotes
            </button>
            <div>
                {quotesState.data.map((quote, index) => (
                    <div key={quote.id}>
                        <button disabled={quotesState.isLoaded} onClick={() => dispatch(selectQuote(index))}>
                            {quote.quote}
                        </button>
                        <br />
                    </div>
                ))}
            </div>
        </div>

    </>;
}