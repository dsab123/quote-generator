export interface Background {
    id: string,
    uri: string,
    blurHash: string,
};

export interface Backgrounds {
    data: Array<Background>,
    selectedIndex: number,
    isCurrentBackgroundLoaded: boolean
}

export interface Error {
    statusCode: number;
    message: string;
    isResolved?: boolean
}

export interface Quote {
    id: number,
    author: string,
    quote: string,
    isItalics: boolean,
    isBold: boolean,
    isUnderlined: boolean,
    topPercentage: number,
    leftPercentage: number,
    fontFamily: string
};

export interface Quotes {
    data: Array<Quote>,
    selectedIndex: number
}

export const randomButtonText = 'random!';

export const OK_STATUS = 200;

export const INTERNAL_ERROR_STATUS = 500;
export const INTERNAL_ERROR_MESSAGE = 'whoa, an internal (possibly API) error happened!';

export const LOGIC_ERROR_STATUS = -1;
export const LOGIC_ERROR_MESSAGE = 'whoa, a logic error happened!';
