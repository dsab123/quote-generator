import { 
    setBackgroundLoaded, 
    loadNewBackground, 
    requestBackground, 
    backgroundApiServerError, 
    setRandomBackgroundIndex, 
    setNextBackgroundIndex, 
    setPreviousBackgroundIndex, 
} from 'store/backgroundsSlice';
import backgroundReducer from 'store/backgroundsSlice';
import { 
    Background, 
    Backgrounds, 
    INTERNAL_ERROR_STATUS, 
    OK_STATUS 
} from 'types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: Backgrounds = {
    data: [],
    selectedIndex: -1,
    isCurrentBackgroundLoaded: false
}

const newImage: Background = {
    id: 'new',
    uri: 'new-uri',
    blurHash: 'new-blurHash'
}

const oneElementState: Backgrounds = {
    data: [
        {
            id: '1',
            uri: 'uri-1',
            blurHash: 'blurHash1'
        }
    ],
    selectedIndex: -1,
    isCurrentBackgroundLoaded: false
    
};

const twoElementState: Backgrounds = {
    data: [
        {
            id: '1',
            uri: 'uri-1',
            blurHash: 'blurHash1'
        },
        {
            id: '2',
            uri: 'uri-2',
            blurHash: 'blurHash2'
        }
    ],
    selectedIndex: 0,
    isCurrentBackgroundLoaded: false
};

function createApiClientMock(a: any, status: number): any {
    return {
        photos: {
            getRandom: (a: any) => {
                return {
                    status: status,
                    response: {
                        urls: {
                            raw: 'url'
                        },
                        id: 'id',
                        blur_hash: 'blurHash'
                    }
                }
            }
        }
    }
}

describe('backgroundaSlice tests', () => {
    it('setBackgroundLoaded reducer - ', () => {
        const state = backgroundReducer(initialState, setBackgroundLoaded());

        expect(state.isCurrentBackgroundLoaded).toBeTruthy();
    });

    it('loadNewBackground reducer - background is changed', () => {
        const state = backgroundReducer(initialState, loadNewBackground({
            ...newImage
        }));

        expect(state.isCurrentBackgroundLoaded).toBeFalsy();
    });

    it('setRandomBackgroundIndex - empty data, returns 0', () => {
        const state = backgroundReducer(initialState, setRandomBackgroundIndex());

        expect(state.selectedIndex).toBe(-1);
    });

    it('setRandomBackgroundIndex - one-element data, returns 0', () => {
        const state = backgroundReducer(oneElementState, setRandomBackgroundIndex());

        expect(state.selectedIndex).toBe(0);
    });

    it('setRandomBackgroundIndex - multiple-element data, returns not-previous ', () => {
        const state = backgroundReducer(twoElementState, setRandomBackgroundIndex());

        expect(state.selectedIndex).not.toBe(0);
    });

    it('setNextBackgroundIndex - returns 0 when wraps "backward" on data', () => {
        const state = backgroundReducer({
            ...twoElementState, selectedIndex: 1
        }, setNextBackgroundIndex());

        expect(state.selectedIndex).toBe(0);
    });
    
    it('setPreviousBackgroundIndex - returns -1 when empty data', () => {
        const state = backgroundReducer(initialState, setPreviousBackgroundIndex());

        expect(state.selectedIndex).toBe(-1);
    });

    it('setPreviousBackgroundIndex - returns last element when wraps "forward" on data', () => {
        const state = backgroundReducer({
            ...twoElementState, selectedIndex: 0
        }, setNextBackgroundIndex());

        expect(state.selectedIndex).toBe(1);
    });

    it('requestBackground thunk - non-ok result raises error', async () => {
        let result: Array<PayloadAction> = [];

        const dispatch = (action: PayloadAction<any>) => result.push(action);
        const getState = () => ({background: {...initialState}});
        
        const thunk: any = requestBackground(createApiClientMock({}, INTERNAL_ERROR_STATUS));

        await thunk(dispatch, getState);

        expect(result.length).toBe(1);
        expect(result[0].type).toBe('error/raiseError');
        expect(result[0].payload).toStrictEqual(backgroundApiServerError);
    });

    it('requestBackground thunk - ok result dispatches loadNewBackground', async () => {
        let result: Array<PayloadAction> = [];

        const dispatch = (action: PayloadAction<any>) => result.push(action);
        const getState = () => ({background: {...initialState}});
        
        const thunk: any = requestBackground(createApiClientMock({}, OK_STATUS));

        await thunk(dispatch, getState);

        expect(result.length).toBe(1);
        expect(result[0].type).toBe('backgrounds/loadNewBackground');
        expect(result[0].payload).toStrictEqual({
            id: 'id',
            uri: 'urlq=75&fm=jpg&w=500&h=500&fit=crop',
            blurHash: 'blurHash'
        });
    });

    it('requestBackground thunk - invalid result raises error', async () => {
        let result: Array<PayloadAction> = [];

        const dispatch = (action: PayloadAction<any>) => result.push(action);
        const getState = () => ({background: {...initialState}});
        
        const thunk: any = requestBackground({});

        await thunk(dispatch, getState);

        expect(result.length).toBe(1);
        expect(result[0].type).toBe('error/raiseError');
        expect(result[0].payload).toStrictEqual(backgroundApiServerError);
    });


})