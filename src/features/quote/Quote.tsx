import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestQuote, selectQuote } from './quoteSlice';
import 'tailwindcss/tailwind.css';

export function Quote() {
    const quoteState = useSelector(selectQuote);
    const dispatch = useDispatch();

    return <>
        <div className="flex-col w-500px">
            <button 
            className="bg-blue-400 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded" 
            onClick={() => dispatch(requestQuote())}>
                Get Quote!
            </button>
            {/* <p className="text-2xl">{quoteState.quote}</p> */}
        </div>
        
    </>;
}