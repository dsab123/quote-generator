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

                {quote && 
                <div>
                    <img 
                    alt="background-quote" 
                    src={backgroundsState.data[backgroundsIndex]?.uri} 
                    style={{display: backgroundsState.isCurrentBackgroundLoaded ? 'block': 'none'}}
                    onLoad={() => {
                        dispatch(setBackgroundLoaded());
                    }} />

                    <div 
                    className={`absolute xl:w-1/3 lg:w-2/5 md:w-2/4 sm:w-3/5 xs:w-4/5
                        ${quote.isBold ? " font-bold " : ""} 
                        ${quote.isItalics ? " italic " : ""} 
                        ${quote.isUnderlined ? " underline " : ""}`} 
                    style={{
                         top: `${quote.topPercentage}%`,
                         left: `${quote.leftPercentage}%`,
                         transform: 'translate(-50%, -50%)'
                    }}>
                        <p className={`text-2xl font-${quote.fontFamily}`}>
                            {quote.quote}
                        </p>
                        <p className="text-md">
                            {quote.author}
                        </p>
                    </div>
                </div>
                }
            </div>
        </div>
    </>;
}