import React from 'react';
import App from '../App';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { initialButtonText } from '../features/background/backgroundSlice';

describe('App tests', () => {
  it('renders app sanity', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText(`${initialButtonText}`)).toBeInTheDocument();
  });
})