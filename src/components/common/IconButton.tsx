import { Button } from 'react-bootstrap';

export type IconButtonProps = {
  onClick: React.MouseEventHandler;
  icon: JSX.Element;
  className?: string;
  disabled?: boolean;
};

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  className,
  disabled,
}) => (
  <Button className={className} onClick={onClick} disabled={disabled}>
    {icon}
  </Button>
);
