import { TQuestion } from '../../types/types';
import styles from './Question.module.sass';
import React from 'react';
import { removeSquareBrackets } from '../../utils/removeSquareBrackets';

export const Question = (props: TQuestion) => {
  return (
    <div className={styles.phrase}>
      <p>{removeSquareBrackets(props.definition)}</p>
      <br/>
    </div>
  );
};