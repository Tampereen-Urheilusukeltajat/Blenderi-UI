import '../../styles/common/button.css';

export enum ButtonType {
  button = 'button',
  reset = 'reset',
  submit = 'submit',
}

export type CommonButtonProps = {
  className?: string;
  disabled?: boolean;
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
  className = '',
  disabled,
  icon,
  onClick,
  type = ButtonType.button,
}) => (
  <button
    className={`iconButton ${className}`}
    onClick={onClick}
    disabled={disabled}
    type={type}
  >
    {icon}
  </button>
);

export const PrimaryButton: React.FC<TextButtonProps> = ({
  className = '',
  disabled,
  onClick,
  text,
  type = ButtonType.button,
}) => (
  <button
    className={`primaryButton ${className}`}
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {text}
  </button>
);

export const SecondaryButton: React.FC<TextButtonProps> = ({
  className = '',
  disabled,
  onClick,
  text,
  type = ButtonType.button,
}) => (
  <button
    className={`secondaryButton ${className}`}
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {text}
  </button>
);

export const TertiaryButton: React.FC<TextButtonProps> = ({
  className = '',
  disabled,
  onClick,
  text,
  type = ButtonType.button,
}) => (
  <button
    className={`tertiaryButton ${className}`}
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {text}
  </button>
);
