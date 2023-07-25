import React from 'react';
import { Provider } from 'react-redux';
import MainPage from '../../pages/MainPage';
import styles from './App.module.sass';
import { store } from '../../store/store';

function App() {
  return (
    <Provider store={store}>
      <div className={styles.App}>
        <MainPage />
      </div>
    </Provider>
  );
}

export default App;
