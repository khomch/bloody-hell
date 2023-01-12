import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TAnswer } from '../../types/types';
import styles from './Answer.module.sass';
import removeSquareBrackets from '../../utils/removeSquareBrackets';
import { sendAnswer } from '../../store/slices/phrasesSlice';
import { AppDispatch } from '../../store/store';

function Answer({ word, id }: TAnswer) {
  const dispatch = useDispatch<AppDispatch>();
  const isAnswered = useSelector((store: any) => store.phrases.isAnswered);
  const answer = useSelector((store: any) => store.phrases.answer);

  return (
    <div className={styles.answer}>
      <button
        className={
        `${styles[isAnswered && answer.defid === id && 'right']}
        ${styles[isAnswered && answer.defid !== id && 'wrong']}`
      }
        type="button"
        onClick={() => dispatch(sendAnswer(id))}
      >
        { removeSquareBrackets(word) }
      </button>
      <br />
    </div>
  );
}

export default Answer;
