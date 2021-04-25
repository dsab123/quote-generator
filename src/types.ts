export interface Background {
    id: string,
    uri: string,
    isLoaded: boolean,
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
    selectedIndex: number
}

export const OK_STATUS = 200;

export const INTERNAL_ERROR_STATUS = 500;
export const INTERNAL_ERROR_MESSAGE = 'whoa, an internal (possibly API) error happened!';

export const LOGIC_ERROR_STATUS = -1;
export const LOGIC_ERROR_MESSAGE = 'whoa, a logic error happened!';
