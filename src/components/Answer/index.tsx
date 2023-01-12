import React from 'react';
import { TAnswer } from '../../types/types';
import styles from './Answer.module.sass';
import removeSquareBrackets from '../../utils/removeSquareBrackets';
import { sendAnswer } from '../../store/slices/phrasesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

function Answer({ word, id }: TAnswer) {
  const dispatch = useAppDispatch();
  const {
    phrase, isAnswered,
  } = useAppSelector((store: any) => store.phrases);

  return (
    <div className={styles.answer}>
      <button
        className={
        `${styles[isAnswered && phrase.defid === id && 'right']}
        ${styles[isAnswered && phrase.defid !== id && 'wrong']}`
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
