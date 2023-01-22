import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import InputField from '../components/InputField';
import { validators } from '../utilities/Validator';
import styled from 'styled-components';
import { passwordResetEmail } from '../actions/userActions';
import media from '../utilities/media';
import { useScrollToTop } from '../utilities/scrollToTop';

const ForgotPasswordScreen = () => {
  document.title = 'C9ForLife | Forgot Password';
  useScrollToTop();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userPasswordResetEmail = useSelector(
    (state) => state.userPasswordResetEmail
  );
  const { loading, error, success } = userPasswordResetEmail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }

    if (email && success) {
      setMessage('Check your inbox for password reset link');
    }
  }, [email, success, userInfo, navigate]);

  const handleEmail = (email) => setEmail(email);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(passwordResetEmail(email));
  };
  return (
    <MainWrapper>
      {!userInfo && (
        <CardWrapper className="card">
          <div className="card-header">Reset Password</div>
          <div className="card-body">
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            {message && <Message variant="success">{message}</Message>}
            <form onSubmit={submitHandler}>
              <InputField
                value={email}
                placeholder="Please enter your email address"
                type="email"
                validators={[
                  {
                    check: validators.email,
                    message: 'Please enter a valid email address',
                  },
                ]}
                onChange={handleEmail}
                fontAwesomeIcon="fas fa-envelope"
              />

              <div className="text-right">
                <button type="submit" className="btn btn-info my-3">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </CardWrapper>
      )}
    </MainWrapper>
  );
};

export default ForgotPasswordScreen;

const MainWrapper = styled.div`
  min-height: 80vh;
  /* margin-top: 2rem; */
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
