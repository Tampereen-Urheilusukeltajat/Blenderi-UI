import React from 'react';
import styles from './Buttons.module.scss';

export enum ButtonType {
  button = 'button',
  reset = 'reset',
  submit = 'submit',
}

export type CommonButtonProps = {
  className?: string;
  disabled?: boolean;
  key?: string;
  onClick?: React.MouseEventHandler;
  type?: ButtonType;
};

export type TextButtonProps = CommonButtonProps & {
  text: string;
};

export type IconButtonProps = CommonButtonProps & {
  icon: JSX.Element;
};

export const IconButton: React.FC<IconButtonProps> = ({
  disabled,
  key,
  icon,
  onClick,
  type = ButtonType.button,
}) => (
  <button
    id={styles.commonButton}
    className={styles.iconButton}
    onClick={onClick}
    key={key}
    disabled={disabled}
    type={type}
  >
    {icon}
  </button>
);

export const PrimaryButton: React.FC<TextButtonProps> = ({
  disabled,
  key,
  onClick,
  text,
  type = ButtonType.button,
}) => (
  <button
    id={styles.commonButton}
    className={styles.primaryButton}
    disabled={disabled}
    key={key}
    onClick={onClick}
    type={type}
  >
    {text}
  </button>
);

export const SecondaryButton: React.FC<TextButtonProps> = ({
  disabled,
  key,
  onClick,
  text,
  type = ButtonType.button,
}) => (
  <button
    id={styles.commonButton}
    className={styles.secondaryButton}
    disabled={disabled}
    key={key}
    onClick={onClick}
    type={type}
  >
    {text}
  </button>
);

export const TertiaryButton: React.FC<TextButtonProps> = ({
  disabled,
  key,
  onClick,
  text,
  type = ButtonType.button,
}) => (
  <button
    id={styles.commonButton}
    className={styles.tertiaryButton}
    disabled={disabled}
    key={key}
    onClick={onClick}
    type={type}
  >
    {text}
  </button>
);
