import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './main.css';
import './i18n.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
todo:
- tie themeswitcher to state

- languagepicker and i18n
- priceresults

-> layout done

then:
- web scraping
- db fetching


testing:
- jest, cypress

maybe:
- retrowave font
- background more interesting
- pwa

fix:
- figure out a way to prevent rerender on every input change while still being able to control from both toggler and input
*/
