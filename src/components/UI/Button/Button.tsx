import React, { SyntheticEvent } from 'react';
import styles from './Button.module.sass';

type TButtonProps = {
  type: 'button' | 'submit' | 'reset';
  value: string | number;
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  id: string;
  variant: 'primary' | 'secondary' | 'answer';
  isRight?: boolean;
  isWrong?: boolean;
  customModifier?: string;
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
};

function Button({
  type, value, onClick, id, variant, size, customModifier, disabled, isRight, isWrong,
}: TButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type === 'submit' ? 'submit' : 'button'}
      id={id}
      className={`${styles.button} 
        ${styles[`button_${variant}`]}
        ${styles[`button_${size}`]}
        ${styles[`button_${isRight && 'right'}`]}
        ${styles[`button_${isWrong && 'wrong'}`]}
        ${styles[`${customModifier}`]}
      `}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

Button.defaultProps = {
  onClick: () => null,
  customModifier: '',
  disabled: false,
  isRight: false,
  isWrong: false,
};

export default Button;
