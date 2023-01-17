import React from 'react';
import { TAnswer } from '../../types/types';
import styles from './Answer.module.sass';
import removeSquareBrackets from '../../utils/removeSquareBrackets';
import { sendAnswer } from '../../store/slices/phrasesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Button from '../UI/Button/Button';

function Answer({ word, id }: TAnswer) {
  const dispatch = useAppDispatch();
  const {
    phrase, isAnswered,
  } = useAppSelector((state) => state.phrases);

  return (
    <div className={styles.answer}>
      <Button
        size="medium"
        variant="answer"
        isRight={(isAnswered && phrase!.defid === id)}
        isWrong={(isAnswered && phrase!.defid !== id)}
        id="button-start"
        type="button"
        value={removeSquareBrackets(word)}
        disabled={isAnswered}
        onClick={() => dispatch(sendAnswer(id))}
      />
      <br />
    </div>
  );
}

export default Answer;
