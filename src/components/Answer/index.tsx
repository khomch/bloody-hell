import React from 'react';
import { TAnswer } from '../../types/types';
import styles from './Answer.module.sass';
import { removeSquareBrackets } from '../../utils/removeSquareBrackets';

export const Answer = (props: TAnswer) => {
  return (
    <div className={styles.phrase}>
      <p onClick={props.onClick}>{removeSquareBrackets(props.word)}</p>
      <br/>
    </div>
  );
};