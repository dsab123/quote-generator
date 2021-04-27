import React, { useEffect } from 'react';
import { Background } from './features/background/Background';
import { Quotes } from './features/quotes/Quotes';
import { Error } from './features/error/Error';
import 'tailwindcss/tailwind.css';
import { useDispatch } from 'react-redux';
import { loadQuotesAsync } from './features/quotes/quotesSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {dispatch(loadQuotesAsync())}, [dispatch]);

  return (  
    <div className="App text-center flex flex-col justify-center">
      <Error />
      <div className="flex justify-center">
        <img alt="background" src={process.env.PUBLIC_URL + '/logo_large.png'} />
      </div>
      <Background />
      <Quotes />
    </div>
  );
}

export default App;
