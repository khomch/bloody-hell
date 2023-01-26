import React from 'react';
import { TAnswer } from '../../types/types';
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
  );
}

export default Answer;
