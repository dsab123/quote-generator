import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    defaultBlurHash, 
    selectBackgrounds, 
    setBackgroundLoaded
} from 'store/backgroundsSlice'
import { selectQuotes } from 'store/quotesSlice';
import { Blurhash } from 'react-blurhash';
import 'tailwindcss/tailwind.css';

export function Backgrounds() {
    const dispatch = useDispatch();

    const backgroundsState = useSelector(selectBackgrounds);
    const backgroundsIndex = backgroundsState.selectedIndex;
    const quotesState = useSelector(selectQuotes);
    
    const quotesIndex = quotesState.selectedIndex;
    const quote = quotesState.data[quotesIndex];

    return <>
        <div className="flex flex-col items-center" id="background">
            <div className="flex flex-col items-center">
                {backgroundsState.isCurrentBackgroundLoaded === false &&
                    <Blurhash
                        hash={backgroundsIndex > 0
                            ? backgroundsState.data[backgroundsIndex].blurHash
                            : defaultBlurHash}
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
                    src={backgroundsState.data[backgroundsIndex]?.uri} 
                    style={{display: backgroundsState.isCurrentBackgroundLoaded ? 'block': 'none'}}
                    onLoad={() => {
                        dispatch(setBackgroundLoaded());
                    }} />

                    <div 
                    className={`absolute 
                        ${quote?.isBold ? " font-bold " : ""} 
                        ${quote?.isItalics ? " italic " : ""} 
                        ${quote?.isUnderlined ? " underline " : ""}`} 
                    style={{
                         top: `${backgroundsState.topPercentage}%`,
                         left: `${backgroundsState.leftPercentage}%`,
                         transform: 'translate(-50%, -50%)'
                    }}>
                        <p className="text-2xl">
                            {quote?.quote}
                        </p>
                        <p className="text-md">
                            {quote?.author}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>;
}