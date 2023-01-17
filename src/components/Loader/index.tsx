import React from 'react';
import styles from './Loader.module.sass';
import loader from '../../public/loader.svg';

export default function Loader() {
  return (
    <img className={styles.loader} src={loader} alt="loading" />
  );
}
