import { 
    Backgrounds, 
    INTERNAL_ERROR_STATUS, 
    OK_STATUS 
} from 'types';
import { 
    createSlice, 
    PayloadAction 
} from '@reduxjs/toolkit';
import { AppThunk, RootState } from '.';
import { createApi } from 'unsplash-js';
import { raiseError } from './errorSlice';
import { Background } from 'types';

export const defaultBlurHash = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';

const initialState: Backgrounds = {
    data: [],
    selectedIndex: -1,
    isCurrentBackgroundLoaded: false,
};

const unsplashApiClient = createApi({
    accessKey: `${process.env.REACT_APP_UNSPLASH_API_KEY}`
  });

export const backgrounds = createSlice({
    name: 'backgrounds',
    initialState,
    reducers: {
        setBackgroundLoaded: state => {
            state.isCurrentBackgroundLoaded = true;
        },
        loadNewBackground: (state, action: PayloadAction<Background>) => {
            state.data.push({
                id: action.payload.id,
                uri: action.payload.uri,
                blurHash: action.payload.blurHash
            });

            state.selectedIndex = state.data.length - 1;
            state.isCurrentBackgroundLoaded = false;
        },
        setRandomBackgroundIndex: (state) => {
            // returns an index within our data array bounds
            let candidateIndex = state.selectedIndex;

            while(candidateIndex === state.selectedIndex && state.data.length > 0) {
                candidateIndex = Math.abs(Math.floor(Math.random() * state.data.length - 1)) % state.data.length;
            }

            state.selectedIndex = candidateIndex;
        },
        setNextBackgroundIndex: (state) => {
            state.selectedIndex = Math.abs((state.selectedIndex + 1) % state.data.length);
        },
        setPreviousBackgroundIndex: (state) => {
            if (state.data.length !== 0) {
                state.selectedIndex = Math.abs((state.selectedIndex - 1) % state.data.length);
            }
        }
    }
});

export const { 
    loadNewBackground, 
    setBackgroundLoaded, 
    setRandomBackgroundIndex,
    setNextBackgroundIndex,
    setPreviousBackgroundIndex,
} = backgrounds.actions;

// todo daniel add search parameter instead of hardcoding 'sky'
export const requestBackground = (apiClient: any = unsplashApiClient): AppThunk => async dispatch => {
    try {
        const result = await apiClient.photos.getRandom({query: 'sky', orientation: 'landscape'});

        if (result.status !== OK_STATUS) {
            return dispatch(raiseError(backgroundApiServerError));
        }

        const uri = `${result.response?.urls.raw}q=75&fm=jpg&w=500&h=500&fit=crop` ?? '';

        return dispatch(loadNewBackground({
            id: result.response?.id ?? '',
            uri: uri,
            blurHash: result.response?.blur_hash
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
export const selectBackgrounds = (state: RootState) => state.backgrounds

export default backgrounds.reducer;