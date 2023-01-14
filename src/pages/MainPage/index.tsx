import React from 'react';
import { TPhrase } from '../../types/types';
import {
  getData, changePhrase, startGame, startOver,
} from '../../store/slices/phrasesSlice';
import Answer from '../../components/Answer';
import Question from '../../components/Question';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import getNumber from '../../utils/getNumber';
import { qtyOfPhrases } from '../../utils/constants';

export default function MainPage() {
  const dispatch = useAppDispatch();
  const {
    start, list, phrase, isAnswered, counter, lives, gameOver,
  } = useAppSelector((state) => state.phrases);
  const handleStart = () => {
    dispatch(startGame(getNumber(qtyOfPhrases)));
    dispatch(getData());
  };
  const handleQuestionChange = () => {
    dispatch(changePhrase());
    dispatch(startGame(getNumber(qtyOfPhrases)));
    dispatch(getData());
  };

  const handleGameOver = () => {
    dispatch(startOver());
    dispatch(startGame(getNumber(qtyOfPhrases)));
    dispatch(getData());
  };

  return (
    start
      ? (
        <button
          type="button"
          onClick={() => handleStart()}
        >
          START
        </button>
      )
      : (
        <div>
          {
      phrase
        ? (
          <div>
            <Question definition={phrase.definition} />
            <br />
            {list.map((question: TPhrase) => (
              <Answer
                word={question.word}
                key={question.defid}
                id={question.defid}
              />
            ))}
            <div>{counter}</div>
            <div>{lives}</div>
            {gameOver && (
            <button
              type="button"
              onClick={() => handleGameOver()}
            >
              GAME OVER
            </button>
            )}
            {isAnswered && !gameOver
              && (
                <>
                  <br />
                  <button
                    type="button"
                    onClick={() => handleQuestionChange()}
                  >
                    NEXT
                  </button>
                </>
              )}
          </div>
        )
        : '...loading...'
    }
        </div>
      )
  );
}
