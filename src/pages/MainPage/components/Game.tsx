import React from 'react';
import styles from '../MainPage.module.sass';
import Question from '../../../components/Question';
import GameOver from '../../../components/GameOver';
import { TPhrase } from '../../../types/types';
import Answer from '../../../components/Answer';
import Button from '../../../components/UI/Button/Button';
import Loader from '../../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  changePhrase, getData, startGame, startOver,
} from '../../../store/slices/phrasesSlice';
import getNumber from '../../../utils/getNumber';
import { qtyOfPhrases } from '../../../utils/constants';
import Stats from './Stats';

export default function Game() {
  const dispatch = useAppDispatch();
  const {
    list, phrase, isAnswered, gameOver,
  } = useAppSelector((state) => state.phrases);

  const getNumberAndData = () => {
    dispatch(startGame(getNumber(qtyOfPhrases)));
    dispatch(getData());
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
            <Loader />
          </div>
        )}

      <Stats />

    </div>
  );
}
