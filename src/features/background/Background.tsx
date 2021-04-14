import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestBackground, selectBackground, setBackgroundLoaded } from './backgroundSlice'
import { selectQuote } from '../quote/quoteSlice';
import { Blurhash } from 'react-blurhash';
import 'tailwindcss/tailwind.css';

export function Background() {
    const backgroundState = useSelector(selectBackground);
    const quoteState = useSelector(selectQuote);
    const dispatch = useDispatch();

    return <>
        <div className="flex-col m-9" id="background">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 animate-pulse"
                onClick={() => dispatch(requestBackground())}>
                <p>{backgroundState.buttonText} &#10132;</p>
            </button>
            <div>
                {backgroundState.isBackgroundLoaded === false &&
                    <Blurhash 
                        hash={backgroundState.blurHash ?? 'LEHV6nWB2yk8pyo0adR*.7kCMdnj'}
                        width={500}
                        height={500}
                        resolutionX={32}
                        resolutionY={32}
                        punch={1} /> 
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
                    }}>{quoteState.quote}</p>
                </div>
            </div>
        </div>
    </>;
}