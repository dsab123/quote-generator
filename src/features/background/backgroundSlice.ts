import { INTERNAL_ERROR_STATUS, STATUS_OK } from './../../types';
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
    isBackgroundLoaded: false,
    uri: '',
    buttonText: 'Get Image ',
    blurHash: defaultBlurHash
};

const serverApi = createApi({
    accessKey: 'Xu20sZlB4AW-AiyA3rIGlY7AhjwlUrjPB1MEEjKdQUk' 
    // todo move to env.local
  });

export const background = createSlice({
    name: 'Background',
    initialState,
    reducers: {
        setBackgroundLoaded: state => {
            state.isBackgroundLoaded = true;
        },
        changeBackground: (state: Background, action: PayloadAction<Background>) => {
            state.id = action.payload.id;
            state.uri = action.payload.uri;
            state.blurHash = action.payload.blurHash;
            state.isBackgroundLoaded = false;
            state.buttonText = loadedButtonText;
        },
        resetBackground: state => {
            state.id = '';
            state.uri = '';
            state.blurHash = undefined;
        }
    }
});

export const { changeBackground, setBackgroundLoaded } = background.actions;

export const requestBackground = (): AppThunk => async dispatch => {
    try {
        const result = await serverApi.photos.getRandom({query: 'sky', orientation: 'landscape'});

        if (result.status !== STATUS_OK) {
            return dispatch(raiseError(backgroundApiServerError));
        }

        const uri = `${result.response?.urls.raw}q=75&fm=jpg&w=500&h=500&fit=crop` ?? '';

        return dispatch(changeBackground({
            id: result.response?.id ?? '',
            uri: uri,
            blurHash: result.response?.blur_hash ?? undefined,
            isBackgroundLoaded: false,
            buttonText: ''
        }));
    } catch (reason) {
        return dispatch(raiseError(backgroundApiServerError)); 
    }
};

const backgroundApiServerError = {
    statusCode: INTERNAL_ERROR_STATUS,
    message: "Something happened with the Image Api!"
}

// this would be the mapper
export const selectBackground = (state: RootState) => state.background

export default background.reducer;