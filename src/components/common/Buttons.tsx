import '../../styles/common/button.css';

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
  className = '',
  disabled,
  key,
  icon,
  onClick,
  type = ButtonType.button,
}) => (
  <button
    id="commonButton"
    className={`iconButton ${className}`}
    onClick={onClick}
    key={key}
    disabled={disabled}
    type={type}
  >
    {icon}
  </button>
);

export const PrimaryButton: React.FC<TextButtonProps> = ({
  className = '',
  disabled,
  key,
  onClick,
  text,
  type = ButtonType.button,
}) => (
  <button
    id="commonButton"
    className={`primaryButton ${className}`}
    disabled={disabled}
    key={key}
    onClick={onClick}
    type={type}
  >
    {text}
  </button>
);

export const SecondaryButton: React.FC<TextButtonProps> = ({
  className = '',
  disabled,
  key,
  onClick,
  text,
  type = ButtonType.button,
}) => (
  <button
    id="commonButton"
    className={`secondaryButton ${className}`}
    disabled={disabled}
    key={key}
    onClick={onClick}
    type={type}
  >
    {text}
  </button>
);

export const TertiaryButton: React.FC<TextButtonProps> = ({
  className = '',
  disabled,
  key,
  onClick,
  text,
  type = ButtonType.button,
}) => (
  <button
    id="commonButton"
    className={`tertiaryButton ${className}`}
    disabled={disabled}
    key={key}
    onClick={onClick}
    type={type}
  >
    {text}
  </button>
);
