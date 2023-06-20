import { BsArrowLeftCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../../components/Register/RegisterForm';
import styles from './Register.module.scss';

export const Register: React.FC = () => {
  return (
    <>
      <Link className={styles.styledLink} to={'/'}>
        <BsArrowLeftCircle />
      </Link>
      <div className={styles.content}>
        <RegisterForm />
      </div>
    </>
  );
};
