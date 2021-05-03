import React, { useEffect } from 'react';
import { Backgrounds } from './components/Backgrounds';
import { Quotes } from './components/Quotes';
import { Error } from './components/Error';
import { useDispatch } from 'react-redux';
import { loadQuotesAsync } from './store/quotesSlice';
import 'tailwindcss/tailwind.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {dispatch(loadQuotesAsync())}, [dispatch]);

  return <>  
    <Error />
    <div className="App text-center flex flex-col justify-center items-center">
      <div className="flex justify-center">
        <img alt="background" src={process.env.PUBLIC_URL + '/logo_large.png'} />
      </div>
      {/* <div className={backgroundsState.isCurrentBackgroundLoaded ? "flex " : "flex opacity-50"}> */}
        <Backgrounds />
        <Quotes />
      {/* </div> */}
    </div>
    </>;
}

export default App;
