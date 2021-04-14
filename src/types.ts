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
