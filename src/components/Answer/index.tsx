import React, { useState } from 'react';
import { TAnswer } from '../../types/types';
import styles from './Answer.module.sass';
import removeSquareBrackets from '../../utils/removeSquareBrackets';

function Answer({ word, id, rightAnswer }: TAnswer) {
  const [buttonState, setButtonState] = useState<null | 'right' | 'wrong'>(null);
  const handleAnswerClick = () => {
    setButtonState(id === rightAnswer ? 'right' : 'wrong');
  };

  return (
    <div className={styles.answer}>
      <button
        className={`${buttonState && styles[buttonState]}`}
        type="button"
        onClick={handleAnswerClick}
      >
        { removeSquareBrackets(word) }
      </button>
      <br />
    </div>
  );
}

export default Answer;
