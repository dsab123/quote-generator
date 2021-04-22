export interface Background {
    id: string,
    uri: string,
    isBackgroundLoaded: boolean,
    blurHash?: string,
    buttonText: string
};

export interface Error {
    statusCode: number;
    message: string;
    isResolved?: boolean
}

export interface Quote {
    id: number,
    author: string,
    quote: string
};

export interface Quotes {
    data: Quote[],
    selectedQuoteIndex: number,
    isLoaded: boolean
}
