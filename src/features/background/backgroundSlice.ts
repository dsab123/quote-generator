import { INTERNAL_ERROR_STATUS, OK_STATUS } from './../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { createApi } from 'unsplash-js';
import { raiseError } from '../error/errorSlice';
import { Background } from '../../types';

export const defaultBlurHash = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';
export const initialButtonText = 'load quotes';
export const loadedButtonText = 'another!'

const initialState: Background = {
    id: '',
    isLoaded: false,
    uri: '',
    buttonText: 'Get Image ',
    blurHash: defaultBlurHash
};

const unsplashApiClient = createApi({
    accessKey: 'Xu20sZlB4AW-AiyA3rIGlY7AhjwlUrjPB1MEEjKdQUk' 
    // todo move to env.local
  });

export const background = createSlice({
    name: 'background',
    initialState,
    reducers: {
        setBackgroundLoaded: state => {
            state.isLoaded = true;
        },
        changeBackground: (state: Background, action: PayloadAction<Background>) => {
            state.id = action.payload.id;
            state.uri = action.payload.uri;
            state.blurHash = action.payload.blurHash;
            state.isLoaded = false;
            state.buttonText = loadedButtonText;
        },
        resetBackground: state => {
            state.id = '';
            state.uri = '';
            state.blurHash = defaultBlurHash;
        }
    }
});

export const { changeBackground, setBackgroundLoaded, resetBackground } = background.actions;

// todo daniel add search parameter instead of hardcoding 'sky'
export const requestBackground = (apiClient: any = unsplashApiClient): AppThunk => async dispatch => {
    try {
        const result = await apiClient.photos.getRandom({query: 'sky', orientation: 'landscape'});

        if (result.status !== OK_STATUS) {
            return dispatch(raiseError(backgroundApiServerError));
        }

        const uri = `${result.response?.urls.raw}q=75&fm=jpg&w=500&h=500&fit=crop` ?? '';

        return dispatch(changeBackground({
            id: result.response?.id ?? '',
            uri: uri,
            blurHash: result.response?.blur_hash ?? undefined,
            isLoaded: false,
            buttonText: ''
        }));
    } catch (reason) {
        return dispatch(raiseError(backgroundApiServerError)); 
    }
};

export const backgroundApiServerError = {
    statusCode: INTERNAL_ERROR_STATUS,
    message: "Something happened with the Image Api!"
};

// this would be the mapper
export const selectBackground = (state: RootState) => state.background

export default background.reducer;