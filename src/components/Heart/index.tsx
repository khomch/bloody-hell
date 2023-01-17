import React from 'react';
import styles from './Heart.module.sass';
import heart from '../../public/heart.svg';

export default function Index() {
  return (
    <img className={styles.heart} src={heart} alt="heart" />
  );
}
