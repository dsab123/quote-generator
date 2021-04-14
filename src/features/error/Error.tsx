import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dismissError, selectError } from './errorSlice';
import 'tailwindcss/tailwind.css';

export function Error() {
    const errorState = useSelector(selectError);
    const dispatch = useDispatch();

    return <>
        {!errorState.isResolved && 
        <div className="flex items-center">
            <p className=""> Error! &nbsp;</p>
            <p> {errorState.message} &nbsp;</p>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => dispatch(dismissError())}>
                Dismiss?
            </button>
        </div>}
    </>;
}