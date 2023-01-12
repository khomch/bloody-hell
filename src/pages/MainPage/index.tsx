import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TPhrase } from '../../types/types';
import { getData, changePhrase } from '../../store/slices/phrasesSlice';
import { AppDispatch } from '../../store/store';
import Answer from '../../components/Answer';
import Question from '../../components/Question';

export default function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const start = useSelector((store: any) => store.phrases.start);
  const data = useSelector((store: any) => store.phrases.list);
  const answer = useSelector((store: any) => store.phrases.answer);
  const isAnswered = useSelector((store: any) => store.phrases.isAnswered);
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
      data.length > 0
        ? (
          <div>
            <Question definition={answer.definition} />
            <br />
            {data.map((phrase: TPhrase) => (
              <Answer
                word={phrase.word}
                key={phrase.defid}
                id={phrase.defid}
              />
            ))}
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
