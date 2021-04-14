import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { createApi } from 'unsplash-js';
import { raiseError } from '../error/errorSlice';

interface Background {
    id: string,
    uri: string,
    isBackgroundLoaded: boolean,
    blurHash?: string,
    buttonText: string
};

const initialState: Background = {
    id: '',
    isBackgroundLoaded: false,
    uri: '',
    buttonText: 'Get Image '
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
            state.buttonText = 'Another!'
        },
        resetBackground: state => {
            state.id = '';
            state.uri = '';
            state.blurHash = undefined;
        }

        // todo daniel add handler for 
        // download background, which will need to call Unsplash's /photos/:id/download
    }
});

export const { changeBackground, setBackgroundLoaded } = background.actions;

export const requestBackground = (): AppThunk => async dispatch => {
    try {
        const result = await serverApi.photos.getRandom({query: 'sky', orientation: 'landscape'});

        if (result.status !== 200) return dispatch(raiseError(backgroundApiServerError));

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
    statusCode: 500,
    message: "Something happened with the Image Api!"
}

// this would be the mapper
export const selectBackground = (state: RootState) => state.background

export default background.reducer;