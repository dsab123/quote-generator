import { setBackgroundLoaded, changeBackground, resetBackground, defaultBlurHash, requestBackground, backgroundApiServerError, initialBackgroundButtonText } from '../features/background/backgroundSlice';
import backgroundReducer from '../features/background/backgroundSlice';
import { Background, INTERNAL_ERROR_STATUS, OK_STATUS } from '../types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: Background = {
    id: '',
    isLoaded: false,
    uri: '',
    buttonText: initialBackgroundButtonText,
    blurHash: defaultBlurHash
}

const newState: Background = {
    id: '2',
    isLoaded: true,
    uri: 'some uri or somethign',
    buttonText: 'another!',
    blurHash: 'ImABlurHashMan'
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

describe('backgroundSlice tests', () => {
    it('setBackgroundLoaded reducer - isLoaded is set', () => {
        const state = backgroundReducer(initialState, setBackgroundLoaded());

        expect(state.isLoaded).toBeTruthy();
    });

    it('changeBackground reducer - background is changed', () => {
        const state = backgroundReducer(initialState, changeBackground({
            ...newState
        }));

        expect(state.isLoaded).toBeFalsy();
        expect(state.blurHash).toEqual('ImABlurHashMan');
        expect(state.uri).toEqual('some uri or somethign');
        expect(state.id).toBe('2');
    });

    it ('resetBackground reducer - background is reset', () => {
        const state = backgroundReducer(initialState, resetBackground());

        expect(state.uri).toEqual('');
        expect(state.id).toBe('');
        expect(state.blurHash).toEqual(defaultBlurHash);
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

    it('requestBackground thunk - ok result dispatches changeBackground', async () => {
        let result: Array<PayloadAction> = [];

        const dispatch = (action: PayloadAction<any>) => result.push(action);
        const getState = () => ({background: {...initialState}});
        
        const thunk: any = requestBackground(createApiClientMock({}, OK_STATUS));

        await thunk(dispatch, getState);

        expect(result.length).toBe(1);
        expect(result[0].type).toBe('background/changeBackground');
        expect(result[0].payload).toStrictEqual({
            id: 'id',
            uri: 'urlq=75&fm=jpg&w=500&h=500&fit=crop',
            blurHash: 'blurHash',
            isLoaded: false,
            buttonText: ''
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