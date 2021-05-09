import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    setRandomQuoteIndex, 
    setNextQuoteIndex, 
    setPreviousQuoteIndex, 
    setBold,
    selectQuotes,
    setItalics,
    setUnderlined,
    increaseTopPercentage,
    decreaseTopPercentage
} from 'store/quotesSlice';
import {  
    requestBackground, 
    selectBackgrounds, 
    setNextBackgroundIndex, 
    setPreviousBackgroundIndex, 
    setRandomBackgroundIndex,
} from 'store/backgroundsSlice';
import 'tailwindcss/tailwind.css';
import { randomButtonText } from 'types';

// todo rename this pls
export function Controls() {
    const dispatch = useDispatch();
    const backgroundsState = useSelector(selectBackgrounds);
    const backgroundsIndex = backgroundsState.selectedIndex;
    const quotesState = useSelector(selectQuotes);
    const quote = quotesState.data[quotesState.selectedIndex];

    return <>
        <div className="flex flex-row sm:flex-nowrap xs:flex-wrap justify-center items-center mt-3 mb-4 xs:p-2 sm:p-4 bg-red-900 rounded">
            <p className="text-white font-bold">Quote</p>
            <button
                className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded xs:mt-2 ml-3"
                onClick={() => dispatch(setRandomQuoteIndex())}>
                    {randomButtonText}
            </button>
            <button
                className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded xs:mt-2 ml-3"
                onClick={() => dispatch(setPreviousQuoteIndex())}>
                ←&nbsp;prev
            </button>
            <button
                className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded xs:mt-2 ml-3"
                onClick={() => dispatch(setNextQuoteIndex())}>
                next&nbsp;→
            </button>
            <button
                className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded xs:mt-2 ml-3"
                onClick={() => dispatch(decreaseTopPercentage())}>
                ↑
            </button>
            <button
                className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded xs:mt-2 ml-3"
                onClick={() => dispatch(increaseTopPercentage())}>
                ↓
            </button>
            <button
                className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded xs:mt-2 ml-3"
                onClick={() => dispatch(setBold(!quote.isBold))}>
                <p><b>B</b></p>
            </button>
            <button
                className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded xs:mt-2 ml-3"
                onClick={() => dispatch(setItalics(!quote.isItalics))}>
                <p><i>I</i></p>
            </button>
            <button
                className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded xs:mt-2 ml-3"
                onClick={() => dispatch(setUnderlined(!quote.isUnderlined))}>
                <p><u>U</u></p>
            </button>
        </div>
        <div className="flex flex-row items-center w-500px mb-4 p-4 bg-red-900 rounded ">
            <p className="text-white font-bold">Image</p>
            <button
                className="bg-red-400 text-white hover:bg-red-600 focus:ring focus:ring-offset-1 disabled:bg-gray-500 disabled:text-gray-200 font-bold py-2 px-4 rounded xs:mt-2 ml-3"
                disabled={backgroundsState.data.length <= 1}
                onClick={() => dispatch(setRandomBackgroundIndex())}>
                    {randomButtonText}
            </button>
            <button
                className="bg-red-400 text-white hover:bg-red-600 focus:ring focus:ring-offset-1 disabled:bg-gray-500 disabled:text-gray-200 font-bold py-2 px-4 rounded xs:mt-2 ml-3"
                disabled={backgroundsState.data.length <= 1}
                onClick={() => dispatch(setPreviousBackgroundIndex())}>
                ←&nbsp;prev
            </button>
            <button
                className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded xs:mt-2 ml-3"
                onClick={() => 
                    backgroundsIndex >= backgroundsState.data.length - 1 
                    ? dispatch(requestBackground())
                    : dispatch(setNextBackgroundIndex())
                }>
                next&nbsp;→
            </button>
        </div>

    </>
}