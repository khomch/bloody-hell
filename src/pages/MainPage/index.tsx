import React, { useState } from 'react';
import {
  getData, startGame,
} from '../../store/slices/phrasesSlice';
import { useAppDispatch } from '../../hooks/hooks';
import getNumber from '../../utils/getNumber';
import { qtyOfPhrases } from '../../utils/constants';
import styles from './MainPage.module.sass';
import Button from '../../components/UI/Button/Button';
import Game from './components/Game';

export default function MainPage() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const dispatch = useAppDispatch();

  const handleStart = () => {
    dispatch(startGame(getNumber(qtyOfPhrases)));
    dispatch(getData());
    setIsGameStarted(true);
  };

  return (
    <section className={styles.wrapper}>
      {!isGameStarted
        ? (
          <div className={styles.startButton}>
            <Button
              size="large"
              variant="primary"
              id="button-start"
              type="button"
              value="START"
              onClick={() => handleStart()}
            />
          </div>
        )
        : (
          <section className={styles.gameWindow}>
            <Game />
          </section>
        )}
    </section>
  );
}
