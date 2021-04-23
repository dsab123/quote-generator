import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { defaultBlurHash, requestBackground, selectBackground, setBackgroundLoaded } from './backgroundSlice'
import { selectQuotes } from '../quotes/quotesSlice';
import { Blurhash } from 'react-blurhash';
import 'tailwindcss/tailwind.css';

export function Background() {
    const backgroundState = useSelector(selectBackground);
    const quotesState = useSelector(selectQuotes);
    const dispatch = useDispatch();

    return <>
        <div className="flex flex-col m-1 items-center" id="background">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6 animate-pulse"
                onClick={() => dispatch(requestBackground())}>
                <p>{backgroundState.buttonText} &#10132;</p>
            </button>
            <div className="flex flex-col items-center">
                {backgroundState.isBackgroundLoaded === false &&
                    <Blurhash
                        hash={backgroundState.blurHash ?? defaultBlurHash}
                        width={500}
                        height={500}
                        resolutionX={32}
                        resolutionY={32}
                        punch={1} 
                    /> 
                }
                
                <div>
                    <img 
                    alt="background-quote" 
                    src={backgroundState.uri} 
                    style={{display: backgroundState.isBackgroundLoaded ? 'block': 'none'}}
                    onLoad={() => {
                        dispatch(setBackgroundLoaded());
                    }} />
                    <p className="text-2xl" style={{
                         position: 'absolute',
                         top: '50%',
                         left: '50%',
                         transform: 'translate(-50%, -50%)'
                    }}>{quotesState.data[quotesState.selectedIndex]?.quote}</p>
                </div>
            </div>
        </div>
    </>;
}