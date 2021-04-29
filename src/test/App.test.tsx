import React from 'react';
import App from 'App';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'store';
import { randomButtonText } from 'types';

describe('App tests', () => {
  it('renders app sanity with proper loading button text', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getAllByText(randomButtonText).pop()).toBeInTheDocument();
  });
})