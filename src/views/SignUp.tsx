import SignUpForm from '../components/SignUpForm';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export type SignUpProps = {
  onRegisterSuccess: () => void;
};

const SignUp: React.FC<SignUpProps> = ({ onRegisterSuccess }) => {
  return (
    <div id="signUpContainer">
      <div className="h-100 align-items-center justify-content-center mt-5">
        <Link to="/">
          <BsArrowLeft /> Takaisin
        </Link>
        <SignUpForm onRegisterSuccess={onRegisterSuccess} />
      </div>
    </div>
  );
};

export default SignUp;
