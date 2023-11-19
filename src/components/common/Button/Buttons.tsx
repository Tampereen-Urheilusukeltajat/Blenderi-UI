import React, { useMemo } from 'react';
import styles from './Buttons.module.scss';
import { Tooltip } from 'react-tooltip';

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
  tooltip?: string;
};

export const IconButton: React.FC<IconButtonProps> = ({
  disabled,
  key,
  icon,
  onClick,
  tooltip,
  type = ButtonType.button,
}) => {
  const tooltipId = useMemo(
    () => (tooltip ? crypto.randomUUID() : ''),
    [tooltip]
  );

  return (
    <>
      <button
        className={styles.iconButton}
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltip}
        disabled={disabled}
        id={styles.commonButton}
        key={key}
        onClick={onClick}
        type={type}
      >
        {icon}
      </button>
      {tooltip && <Tooltip id={tooltipId} />}
    </>
  );
};

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
