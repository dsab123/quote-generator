import React, { useEffect } from 'react';
import { Backgrounds } from 'components/Backgrounds';
import { Controls } from 'components/Controls';
import { Error } from 'components/Error';
import { useDispatch } from 'react-redux';
import { loadQuotesAsync } from 'store/quotesSlice';
import 'tailwindcss/tailwind.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {dispatch(loadQuotesAsync())}, [dispatch]);

  return <>  
    <Error />
    <div className="App text-center flex flex-col justify-center items-center m-auto p-5">
      <div className="flex justify-center">
        <img alt="background" src={process.env.PUBLIC_URL + '/logo_large.png'} />
      </div>
        <Backgrounds />
        <Controls />
    </div>
    </>;
}

export default App;
