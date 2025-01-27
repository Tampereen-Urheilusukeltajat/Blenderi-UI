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
  id?: string;
  onClick?: React.MouseEventHandler;
  type?: ButtonType;
};

export type TextButtonProps = CommonButtonProps & {
  text: string;
};

export type ElementButtonProps = CommonButtonProps & {
  element: JSX.Element;
  tooltip?: string;
};

export const ElementButton: React.FC<ElementButtonProps> = ({
  disabled,
  key,
  element,
  id,
  onClick,
  tooltip,
  type = ButtonType.button,
}) => {
  const tooltipId = useMemo(
    () => (tooltip ? crypto.randomUUID() : ''),
    [tooltip],
  );

  return (
    <>
      <button
        className={`${styles.commonButton} ${styles.elementButton}`}
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltip}
        disabled={disabled}
        id={id}
        key={key}
        onClick={onClick}
        type={type}
      >
        {element}
      </button>
      {tooltip && <Tooltip id={tooltipId} />}
    </>
  );
};

export const PrimaryButton: React.FC<TextButtonProps> = ({
  disabled,
  key,
  onClick,
  id,
  text,
  type = ButtonType.button,
}) => (
  <button
    id={id}
    className={`${styles.commonButton} ${styles.primaryButton}`}
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
  id,
  text,
  type = ButtonType.button,
}) => (
  <button
    id={id}
    className={`${styles.commonButton} ${styles.secondaryButton}`}
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
  id,
  text,
  type = ButtonType.button,
}) => (
  <button
    id={id}
    className={`${styles.commonButton} ${styles.tertiaryButton}`}
    disabled={disabled}
    key={key}
    onClick={onClick}
    type={type}
  >
    {text}
  </button>
);
