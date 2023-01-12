import React from 'react';
import { TPhrase } from '../../types/types';
import { getData, changePhrase } from '../../store/slices/phrasesSlice';
import Answer from '../../components/Answer';
import Question from '../../components/Question';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

export default function MainPage() {
  const dispatch = useAppDispatch();
  const {
    start, list, phrase, isAnswered, counter,
  } = useAppSelector((store: any) => store.phrases);

  const handleQuestionChange = () => {
    dispatch(changePhrase());
    dispatch(getData());
  };

  return (
    start
      ? (
        <button
          type="button"
          onClick={() => dispatch(getData())}
        >
          START
        </button>
      )
      : (
        <div>
          {
      list.length > 0
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
            {isAnswered
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
