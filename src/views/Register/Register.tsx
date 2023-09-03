import { RegisterForm } from '../../components/Register/RegisterForm';
import styles from './Register.module.scss';

export const Register: React.FC = () => {
  return (
    <div className={styles.content}>
      <RegisterForm />
    </div>
  );
};
