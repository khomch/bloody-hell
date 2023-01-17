import React from 'react';
import styles from './Smile.module.sass';
import smile1 from '../../public/smiles/smile_1.svg';
import smile2 from '../../public/smiles/smile_2.svg';
import smile3 from '../../public/smiles/smile_3.svg';
import smile4 from '../../public/smiles/smile_4.svg';
import { useAppSelector } from '../../hooks/hooks';

export default function Smile() {
  const {
    counter,
  } = useAppSelector((state) => state.phrases);

  return (
    ((counter === 1) && <img className={styles.smile} src={smile2} alt="smile" />)
    || ((counter === 2) && <img className={styles.smile} src={smile3} alt="smile" />)
    || ((counter > 2) && <img className={styles.smile} src={smile4} alt="smile" />)
    || (<img className={styles.smile} src={smile1} alt="smile" />)
  );
}
