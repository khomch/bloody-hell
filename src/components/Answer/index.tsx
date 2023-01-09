import React from 'react';
import { TAnswer } from '../../types/types';
import styles from './Answer.module.sass';
import removeSquareBrackets from '../../utils/removeSquareBrackets';

function Answer({ onClick, word }: TAnswer) {
  return (
    <div className={styles.phrase}>
      <button type="button" onClick={onClick}>{removeSquareBrackets(word)}</button>
      <br />
    </div>
  );
}

export default Answer;
