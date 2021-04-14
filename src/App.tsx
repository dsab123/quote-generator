import React from 'react';
import { Background } from './features/background/Background';
import { Error } from './features/error/Error';
import { Quote } from './features/quote/Quote';
import './App.css';
import 'tailwindcss/tailwind.css';
import { Quotes } from './features/quotes/Quotes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Error />
        <h2>I'm Quote Generator, Hai</h2>
        <Background />
        <Quotes />
      </header>
    </div>
  );
}

export default App;
