import React, { useState } from 'react';
import { TPhrase } from '../../types/types';
import {
  getData, changePhrase, startGame, startOver,
} from '../../store/slices/phrasesSlice';
import Answer from '../../components/Answer';
import Question from '../../components/Question';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import getNumber from '../../utils/getNumber';
import { qtyOfPhrases } from '../../utils/constants';
import styles from './MainPage.module.sass';
import Button from '../../components/UI/Button/Button';
import Heart from '../../components/Heart';
import Smile from '../../components/Smile';
import GameOver from '../../components/GameOver';

export default function MainPage() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const dispatch = useAppDispatch();
  const {
    list, phrase, isAnswered, counter, lives, gameOver,
  } = useAppSelector((state) => state.phrases);

  const getNumberAndData = () => {
    dispatch(startGame(getNumber(qtyOfPhrases)));
    dispatch(getData());
  };
  const handleStart = () => {
    getNumberAndData();
    setIsGameStarted(true);
  };
  const handleQuestionChange = () => {
    dispatch(changePhrase());
    getNumberAndData();
  };
  const handleGameOver = () => {
    dispatch(startOver());
    getNumberAndData();
  };

  return (
    <div className={styles.MainPage}>
      {!isGameStarted
        ? (
          <Button
            size="large"
            variant="primary"
            id="button-start"
            type="button"
            value="START"
            onClick={() => handleStart()}
          />
        )
        : (
          <section className={styles.gameWindow}>
            <div className={styles.gameWindow__interface}>
              { phrase
                ? (
                  <div className={styles.gameWindow__phrases}>

                    <div className={styles.gameWindow__phrase}>
                      { !gameOver
                        ? <Question definition={phrase.definition} />
                        : <GameOver /> }
                    </div>

                    <div className={styles.gameWindow__answers}>
                      {list.map((question: TPhrase) => (
                        <Answer
                          word={question.word}
                          key={question.defid}
                          id={question.defid}
                        />
                      ))}
                    </div>

                    {gameOver && (
                    <div className={styles.gameWindow__nextButton}>
                      <Button
                        size="large"
                        variant="primary"
                        id="button-start-again"
                        type="button"
                        value="PLAY AGAIN"
                        onClick={() => handleGameOver()}
                      />
                    </div>
                    )}

                    {isAnswered && !gameOver
                    && (
                    <div className={styles.gameWindow__nextButton}>
                      <Button
                        size="large"
                        variant="primary"
                        id="button-next"
                        type="button"
                        value="NEXT"
                        onClick={() => handleQuestionChange()}
                      />
                    </div>
                    )}

                  </div>
                )
                : (
                  <div className={styles.gameWindow__loading}>
                    ...loading...
                  </div>
                )}

              <div className={styles.gameWindow__stats}>
                <div className={styles.gameWindow__points}>{`Points: ${counter}`}</div>
                <div className={styles.gameWindow__lives}><Smile /></div>
                <div className={styles.gameWindow__lives}>
                  {
                    lives.map((heart) => <Heart key={heart.id} />)
                }
                </div>
              </div>

            </div>

          </section>
        )}
    </div>
  );
}
