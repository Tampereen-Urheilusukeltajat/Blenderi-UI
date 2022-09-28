import SignUpForm from '../components/SignUpForm';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div>
      <Link to="/">
        <BsArrowLeft /> Takaisin
      </Link>
      <SignUpForm />
    </div>
  );
}

export default SignUp;
