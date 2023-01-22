import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import Message from '../components/Message';
import Loader from '../components/Loader';
import styled from "styled-components";
import InputField from "../components/InputField";
import { validators } from "../utilities/Validator";
import { login } from '../actions/userActions';
import media from "../utilities/media";
import { useScrollToTop } from '../utilities/scrollToTop';

const LoginScreen = () => {
  document.title = "C9ForLife | Login";
  useScrollToTop();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
        navigate(-1)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, password))
  }

  const handleEmail = (email) => setEmail(email);
  const handlePassword = (password) => setPassword(password);

  return (
    <MainWrapper>
      <CardWrapper className="card">
        <div className="card-header">Secure login</div>
        <div className="card-body">
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <InputField
              value={email}
              placeholder="Please enter your email address"
              type="email"
              validators={[
                { check: validators.email, message: "Please enter a valid email address" },
              ]}
              onChange={handleEmail}
              fontAwesomeIcon="fas fa-envelope"
            />
            <InputField
              value={password}
              placeholder="Please enter your password"
              type="password"
              validators={[{ check: validators.required, message: "This field is required", }]}
              onChange={handlePassword}
              fontAwesomeIcon="fas fa-key"
            />
            <div className="text-right">
              <ButtonWrapper type="submit" className="btn btn-info">
                Submit
              </ButtonWrapper>
            </div>
          </form>

          <BottomWrapper className="text-center">
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
            <Link to="/forgot-password">Forgot password</Link>
          </BottomWrapper>
        </div>
      </CardWrapper>
    </MainWrapper>
  );
};

export default LoginScreen;

const MainWrapper = styled.div`
  height: 80vh;
`;

const CardWrapper = styled.div`
  width: 30%;
  background-color: white;
  border-radius: 10px;
  margin: 6rem auto 3rem auto;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.02), 0 3px 10px 0 rgba(0, 0, 0, 0.02);

  ${media.medium`
    width: 90%;
    margin-top: 3rem;
  `}
`;

const ButtonWrapper = styled.button`
  font-weight: bold;
`;

const BottomWrapper = styled.div`
  margin-top: 4rem;
  > p > a {
    text-decoration: none;
  }

  > a {
    text-decoration: none;
  }
`;
