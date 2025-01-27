import { useCallback, useRef, useState, type PropsWithChildren } from 'react';
import { ButtonType } from '../common/Button/Buttons';
import styles from './Navbar.module.scss';
import { useMatch, useResolvedPath } from 'react-router-dom';

type AdminDropdownButtonProps = PropsWithChildren & {
  disabled?: boolean;
  key?: string;
  text: string;
};

export const AdminDropdown: React.FC<AdminDropdownButtonProps> = ({
  children,
  disabled,
  key,
  text,
}) => {
  const resolvedPath = useResolvedPath('/admin/*');

  const [isOpen, setIsOpen] = useState(false);
  const isActive = !!useMatch({ path: resolvedPath.pathname });

  const onDropdownButtonClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseLeave = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div
      className="dropdown show"
      ref={dropdownRef}
      onMouseLeave={handleMouseLeave}
    >
      <button
        id={'dropdownMenuLink'}
        className={`
          ${styles.dropdownButton} dropdown-toggle 
          ${isActive ? styles.active : ''} 
          ${isOpen ? styles.open : ''}
        `}
        disabled={disabled}
        key={key}
        onClick={onDropdownButtonClick}
        type={ButtonType.button}
      >
        {text}
      </button>

      {isOpen && <div className={styles.dropdownMenu}>{children}</div>}
    </div>
  );
};
