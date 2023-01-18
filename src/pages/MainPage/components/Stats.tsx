import React from 'react';
import styles from '../MainPage.module.sass';
import Smile from '../../../components/Smile';
import Heart from '../../../components/Heart';
import { useAppSelector } from '../../../hooks/hooks';

export default function Stats() {
  const {
    counter, lives,
  } = useAppSelector((state) => state.phrases);

  return (
    <div className={styles.gameWindow__stats}>
      <div className={styles.gameWindow__points}>{`Points: ${counter}`}</div>
      <div className={styles.gameWindow__lives}><Smile /></div>
      <div className={styles.gameWindow__lives}>
        {
            lives.map((heart) => <Heart key={heart.id} />)
          }
      </div>
    </div>
  );
}
