import React from 'react';
import styles from './Question.module.sass';
import removeSquareBrackets from '../../utils/removeSquareBrackets';
import { TQuestion } from '../../types/types';

export default function Question({ definition }: TQuestion) {
  return (
    <div className={styles.phrase}>
      <p>{removeSquareBrackets(definition)}</p>
      <br />
    </div>
  );
}
