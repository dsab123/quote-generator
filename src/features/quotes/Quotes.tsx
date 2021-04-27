import React from 'react';
import { useDispatch } from 'react-redux';
import { updateRandomQuoteIndex, randomQuotesButtonText, setNextQuoteIndex, setPreviousQuoteIndex } from './quotesSlice';
import 'tailwindcss/tailwind.css';

// todo rename this pls
export function Quotes() {
    const dispatch = useDispatch();

    return <>
        <div className="flex-col w-500px mt-3 mb-4">
            <button
                className="bg-red-400 hover:bg-red-800 text-white font-bold py-2 px-4 rounded ml-3"
                onClick={() => dispatch(updateRandomQuoteIndex())}>
                    {randomQuotesButtonText}
            </button>
            <button
                className="bg-red-400 hover:bg-red-800 text-white font-bold py-2 px-4 rounded ml-3"
                onClick={() => dispatch(setPreviousQuoteIndex())}>
                ← prev
            </button>
            <button
                className="bg-red-400 hover:bg-red-800 text-white font-bold py-2 px-4 rounded ml-3"
                onClick={() => dispatch(setNextQuoteIndex())}>
                next →
            </button>
        </div>

    </>
}