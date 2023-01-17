import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';
import './index.sass';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
document.body.classList.add('mystyle');

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
