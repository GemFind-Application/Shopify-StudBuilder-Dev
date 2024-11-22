import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import Main from './Main';
import './scss/style.scss';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <CookiesProvider>
       <Main />
     </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

