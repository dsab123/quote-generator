import { Quote } from 'types';

export const CreateQuote = (id: number, author: string, quote: string) : Quote => {
    return {
        id: id,
        author: author,
        quote: quote,
        isItalics: false,
        isBold: false,
        isUnderlined: false,
        topPercentage: 50,
        leftPercentage: 50,
        fontFamily: ''
    }
}