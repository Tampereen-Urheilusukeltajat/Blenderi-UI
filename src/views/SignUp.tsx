import SignUpForm from '../components/SignUpForm';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const SignUp = (): JSX.Element => {
  return (
    <div id="signUpContainer">
      <div className="h-100 align-items-center justify-content-center mt-5">
        <Link to="/">
          <BsArrowLeft /> Takaisin
        </Link>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
